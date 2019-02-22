import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Actions, State, useActions, useStore } from "easy-peasy";
import { IStore } from "../../store";
import useYoutube from "../../hooks/useYoutube";
import { Redirect } from "react-router";
import { get } from 'lodash';
import { Button } from '@blueprintjs/core';
import useMultiKeyPressCallback from "../../hooks/useMultiKeyPressCallback";

import styles from './Player.module.css';
import useInterval from '../../hooks/useInterval';
import { func } from "prop-types";
import secondsToMilliseconds from '../../utils/seconds-to-milliseconds';

interface PlayerProps {
  [key: string]: any;
}

const jj = JSON.stringify;

type CallbackFunction = () => void;


function Player(props: PlayerProps) {
  // const renderCountRef = useRef(0);
  // if (renderCountRef.current > 7) {
  //   console.log("RENDER:", ++renderCountRef.current);
  // }
  const id = props.match.params.id;
  const {
    onFetchSubtitlesFromTasksStore,
  } = useActions((a: Actions<IStore>) => ({
    setIsOpenListModal: a.app.setIsOpenListModal,
    onFetchSubtitlesFromTasksStore: a.player.fetchSubtitlesFromTasksStore,
  }));

  const timeoutRef = useRef(0);
  const timeoutCountRef = useRef(0);
  const prevPlayerStateRef = useRef(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [updateValue, setUpdateValue] = useState(0);
  const [sbCurrentIndex, setSbCurrentIndex] = useState(-1);
  const [sbIsShow, setSbIsShow] = useState(false);
  const currentTask = useStore((s: State<IStore>) => s.getTaskById(Number(id)), [id]);
  const tasksState = useStore((s: State<IStore>) => s.tasks, [id]);
  const playerState = useStore((s: State<IStore>) => s.player, [id]);
  const subtitlesSize = playerState.subtitles.length;

  useEffect(() => {
    if (tasksState.isFetching) {
      return;
    }
    onFetchSubtitlesFromTasksStore(id);
  }, [id, tasksState.isFetching]);


  if (!id) {
    return <Redirect to="/"/>;
  }

  const videoId = get(currentTask, 'url');

  const {video, player} = useYoutube(videoId, {
    width: '100%',
    height: '100%',
    playerVars: {
      // controls: 0,
      start: 1,
      fs: 0,
      rel: 0,
      disablekb: 1,
      modestbranding: 3,
    },
    // events: {
    //   onStateChange: ({target}) => update(target),
    // },
  });

  // useEffect(() => {
  //   if (!player) {
  //     return;
  //   }
  //   update(player);
  // }, [updateValue]);


  // Space key
  useMultiKeyPressCallback([' '], () => {
    if (!player) return;
    if (player.getPlayerState() === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  useMultiKeyPressCallback(['ArrowLeft'], () => {
    if (!player) return;
    checkAndSeek(false);
  });
  useMultiKeyPressCallback(['ArrowRight'], () => {
    if (!player) return;
    checkAndSeek(true);
  });
  useMultiKeyPressCallback(['1'], () => handleNumberKey('1'));
  useMultiKeyPressCallback(['2'], () => handleNumberKey('2'));
  useMultiKeyPressCallback(['3'], () => handleNumberKey('3'));
  useMultiKeyPressCallback(['4'], () => handleNumberKey('4'));
  useMultiKeyPressCallback(['5'], () => handleNumberKey('5'));
  useMultiKeyPressCallback(['6'], () => handleNumberKey('6'));
  useMultiKeyPressCallback(['7'], () => handleNumberKey('7'));
  useMultiKeyPressCallback(['8'], () => handleNumberKey('8'));
  useMultiKeyPressCallback(['9'], () => handleNumberKey('9'));
  useMultiKeyPressCallback(['0'], () => handleNumberKey('0'));


  /**
   * deprecated
   */
  function update(yt: YT.Player) {
    // const currentTime = yt.getCurrentTime();
    if (playerState.subtitles.length === 0 || !player) {
      return;
    }
    const state = player.getPlayerState();
    const x = 400;

    if (state === YT.PlayerState.PLAYING) {
      if (
        prevPlayerStateRef.current !== YT.PlayerState.PLAYING
        && prevPlayerStateRef.current !== YT.PlayerState.PAUSED
      ) {
        console.log('%c PLAYING', 'background: #222; color: #bada55');
        console.log("start video");
        const newSb = playerState.subtitles[0];
        setSbCurrentIndex(0);
        timeoutCountRef.current = newSb.end - x;
        console.log("timeoutCountRef.current", timeoutCountRef.current);
        console.time('kk');

        setTimeout(() => {
          setUpdateValue(updateValue + 1);
          console.timeEnd('kk');
          console.log('%c go next !', 'background: red; color: #fff', timeoutCountRef.current);
        }, timeoutCountRef.current);
        console.log('%c PLAYING END', 'background: #222; color: #bada55');

      } else if (
        prevPlayerStateRef.current === YT.PlayerState.PLAYING
      ) {
        console.log('%c NEXT SUB', 'background: #222; color: #bada55');
        console.log("sbCurrentIndex = ", sbCurrentIndex);
        console.log("timeoutCountRef.current", timeoutCountRef.current);
        const newIndex = sbCurrentIndex + 1;
        setSbCurrentIndex(newIndex);
        const newSb = playerState.subtitles[newIndex];
        timeoutCountRef.current = newSb.end - timeoutCountRef.current - x;

        console.time('kk');
        setTimeout(() => {
          setUpdateValue(updateValue + 1);
          console.log('%c go next __ !', 'background: red; color: #fff', timeoutCountRef.current);
          console.timeEnd('kk');
        }, timeoutCountRef.current);
        console.log('%c NEXT SUB END', 'background: #222; color: #bada55');
      }
    } else if (state === YT.PlayerState.PAUSED) {

      console.log("PAUSED");
    } else if (state === YT.PlayerState.BUFFERING) {
      console.log('BUFFERING');
    } else {
      // console.log("state = ", state);
    }
    prevPlayerStateRef.current = state;
  }

  useInterval(() => {
    if (!player) return;
    setCurrentTime(player.getCurrentTime());
  }, 300);

  function findCurrentSubtitleIndex(time: number) {
    console.log("time = ", time);
    for (let i = 0; i < playerState.subtitles.length; i++) {
      const videoElement = playerState.subtitles[i];
      if (time >= videoElement.start && time <= videoElement.end) {
        console.log("time.start = ", videoElement.start);
        console.log("time.end = ", videoElement.end);
        return i;
      }
    }
  }

  function checkAndSeek(next: boolean) {
    if (!player) return;
    console.log("......................", next ? 'next' : 'prev');
    const plainCurrentTime = player.getCurrentTime();
    console.log("plainCurrentTime = ", plainCurrentTime);
    const currentTime = secondsToMilliseconds(plainCurrentTime);
    const index = findCurrentSubtitleIndex(currentTime);

    if (index === undefined) {
      const firstSb = playerState.subtitles[0];
      player.seekTo((firstSb.start) / 1000, true);
      return;
    }

    const currentSb = playerState.subtitles[index];
    const nextSb = playerState.subtitles[index + 1];
    const prevSb = playerState.subtitles[index - 1];

    if (next) {
      if (!nextSb) return;
      console.log("Next", nextSb);
      player.seekTo((nextSb.start - 200) / 1000, true);
    } else {
      const diff = currentTime - currentSb.start;
      if (diff < 800 && prevSb) {
        console.log("Prev", prevSb);
        player.seekTo((prevSb.start) / 1000, true);
      }
      if (diff > 800) {
        console.log("Current", currentSb);
        player.seekTo((currentSb.start) / 1000, true);
      }
    }
  }

  function handleNumberKey(k: string) {
    const num = Number(k);
    if (!player) return;

    const x = (player.getDuration() / 10) * num;
    const seekX = num === 0 ? 0 : x;

    player.seekTo(seekX, true);
  }

  function SubtitlesDebug() {
    const current = playerState.subtitles[sbCurrentIndex];
    const next = playerState.subtitles[sbCurrentIndex + 1];

    function item(__: any) {
      return (
        <div className={styles.SubtitlesDebugItem}>
          <div className={styles.SubtitlesDebugTime}>
            <div>
              start: {jj(get(__, 'start'))}
            </div>
            <div>
              end: {jj(get(__, 'end'))}
            </div>
            <div>
              show?: {jj(sbIsShow)}
            </div>
          </div>
          <pre>{jj(get(__, 'text'))}</pre>
        </div>
      );
    }

    return (
      <div className={styles.SubtitlesDebug}>
        <h3>Current: {sbCurrentIndex}, time: {currentTime}</h3>
        {item(current)}
        <h3>Next:</h3>
        {item(next)}
      </div>
    )
  }


  return (
    <div>
      <div style={{height: '100vh'}}>
        {video}
      </div>
      <Button onClick={() => player!.playVideo()} text="play"/>
      <Button onClick={() => player!.pauseVideo()} text="pause"/>
      <Button onClick={() => player!.setVolume(70)} text="set vol"/>
      <div className={styles.container}>
        <div>
        </div>
        <SubtitlesDebug/>
      </div>
    </div>
  )
}


export default Player;
