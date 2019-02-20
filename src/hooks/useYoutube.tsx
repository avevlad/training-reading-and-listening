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
    const isExist = document.querySelector(`#${id}`) !== null;
    const finishEvents = {
      ...events,
      onReady() {
        resolve(player);
      },
    };

    if (!isExist) {
      console.warn(`YouTube hook: div #${id} not found.`);
    }

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

export interface YoutubeHookProps {
  playerVars?: YT.PlayerVars,
  events?: YT.Events,
}


export interface YoutubeHookResult {
  video: ReactNode,
  player: YT.Player | null,
  state: YT.PlayerState,
}

function useYoutube(videoId: string, props?: YoutubeHookProps): YoutubeHookResult {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [state, setState] = useState<YT.PlayerState>(-1);
  const htmlId = useMemo(() => uniqueId('unq-yt-id-'), []);

  const video = !isEmpty(videoId) && <div id={htmlId}/>;

  useEffect(() => {
    if (isEmpty(videoId)) {
      return;
    }

    const playerVars = (props && props.playerVars) || {};
    const events = (props && props.events) || {};
    // const onStateChange = (props && props.events && props.events.onStateChange);

    const opt = {
      id: htmlId,
      videoId,
      playerVars,
    };

    async function load() {
      const ytPlayer = await BuildYTPlayer({
        ...opt,
        events: {
          ...events,
          onStateChange: (data: YT.OnStateChangeEvent) => {
            setState(ytPlayer.getPlayerState());
            events.onStateChange && events.onStateChange(data);
          },
        }
      });
      events.onReady && events.onReady({target: ytPlayer});
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

  return {video, player, state};
}


export default useYoutube;
