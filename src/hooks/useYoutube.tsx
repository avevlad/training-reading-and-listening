import React, { ReactNode, useState, useEffect, useMemo } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: any
    YT: any
  }
}

interface BuildTYOptions {
  id: string,
  videoId: string,
  events: any,
  playerVars: any,
}

const YTScriptLoad = new Promise(res => {
  const tag = document.createElement('script');
  tag.src = `https://www.youtube.com/iframe_api`;
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag!.parentNode!.insertBefore(tag, firstScriptTag);
  window.onYouTubeIframeAPIReady = () => res(window.YT);
});


const BuildYTPlayer = (options: BuildTYOptions): any => {
  const {id, videoId, events, playerVars} = options;

  return new Promise(async (resolve, reject) => {
    const YTp: any = await YTScriptLoad;
    const finishEvents = {
      ...events,
      onReady(event: any) {
        resolve(player);
        events.onReady && events.onReady(event);
      },
    };

    const player = new YTp.Player(id, {
      videoId,
      height: '390',
      width: '640',
      playerVars: playerVars,
      events: finishEvents,
    });

    return player;
  })
};

let idCounter = 0;

function isEmpty(str: string): boolean {
  return (!str || 0 === str.length);
}

function uniqueId(prefix: string) {
  let id = ++idCounter;
  return String(prefix) + id;
}

function useYoutube(videoId: string): [ReactNode, YT.Player | null, YT.PlayerState] {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [state, setState] = useState<YT.PlayerState>(-1);
  const htmlId = useMemo(() => uniqueId('unq-yt-id-'), []);
  const element = !isEmpty(videoId) && <div id={htmlId}/>;

  useEffect(() => {
    if (isEmpty(videoId)) return;
    const opt = {
      id: htmlId,
      videoId,
      events: {},
      playerVars: {},
    };

    async function load() {
      const ytPlayer = await BuildYTPlayer({
        ...opt,
        events: {
          onStateChange: () => {
            setState(ytPlayer.getPlayerState());
          },
        }
      });
      return setPlayer(ytPlayer);
    }

    if (!player) {
      load();
    } else {
      player.cueVideoById(videoId);
    }

    return () => {
      console.log("return");
    };

  }, [videoId]);

  return [element, player, state];
}


export default useYoutube;
