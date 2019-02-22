import React, { ReactNode, useState, useEffect, useMemo, useRef } from "react";

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
  const {id, videoId, events, playerVars, ...otherProps} = options;

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
      ...otherProps,
      videoId,
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
  width?: string | number;
  height?: string | number;
  playerVars?: YT.PlayerVars,
  events?: YT.Events,
}


export interface YoutubeHookResult {
  video: ReactNode,
  player: YT.Player | null,
  state: YT.PlayerState,
}

type CallbackFunction = () => void;

function useYoutube(videoId: string, props?: YoutubeHookProps): YoutubeHookResult {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [state, setState] = useState<YT.PlayerState>(-1);
  const htmlId = useMemo(() => uniqueId('unq-yt-id-'), []);
  // events
  const onReady = useRef<CallbackFunction | any>(null);
  const onStateChange = useRef<CallbackFunction | any>(null);
  const onPlaybackQualityChange = useRef<CallbackFunction | any>(null);
  const onPlaybackRateChange = useRef<CallbackFunction | any>(null);
  const onError = useRef<CallbackFunction | any>(null);
  const onApiChange = useRef<CallbackFunction | any>(null);

  // Remember the latest callback.
  useEffect(() => {
    if (!props) {
      return;
    }

    onReady.current = (props.events && props.events.onReady);
    onStateChange.current = (props.events && props.events.onStateChange);
    onPlaybackQualityChange.current = (props.events && props.events.onPlaybackQualityChange);
    onPlaybackRateChange.current = (props.events && props.events.onPlaybackRateChange);
    onError.current = (props.events && props.events.onError);
    onApiChange.current = (props.events && props.events.onApiChange);
  });

  const video = !isEmpty(videoId) && <div id={htmlId}/>;

  useEffect(() => {
    if (isEmpty(videoId)) {
      return;
    }

    const playerVars = (props && props.playerVars) || {};
    // const events = (props && props.events) || {};

    const opt = {
      width: props!.width,
      height: props!.height,
      id: htmlId,
      videoId,
      playerVars,
    };

    const finalEvents: YT.Events = {
      onReady: (__) => onReady.current && onReady.current(__),
      onStateChange: (__) => onStateChange.current && onStateChange.current(__),
      onPlaybackQualityChange: (__) => onPlaybackQualityChange.current && onPlaybackQualityChange.current(__),
      onPlaybackRateChange: (__) => onPlaybackRateChange.current && onPlaybackRateChange.current(__),
      onError: (__) => onError.current && onError.current(__),
      onApiChange: (__) => onApiChange.current && onApiChange.current(__),
    };

    async function load() {
      const ytPlayer = await BuildYTPlayer({
        ...opt,
        events: finalEvents,
      });
      // events.onReady && events.onReady({target: ytPlayer});
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
