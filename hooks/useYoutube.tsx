import React, { ReactNode, useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";

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

const buildYId = (id: string) => `youtube-${id}`;

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

let counter = 0;

export default function useYoutube(videoId: string): [ReactNode, YT.Player | null, YT.PlayerState] {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [state, setState] = useState<YT.PlayerState>(-1);
  counter++;
  const htmlId = `${counter}-${buildYId(videoId)}`;
  const element = !isEmpty(videoId) && <div id={htmlId}/>;

  useEffect(() => {
    if (!videoId) return;

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
    }

  }, [videoId]);


  return [element, player, state];
}
