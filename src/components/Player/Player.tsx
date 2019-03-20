import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Actions, State, useActions, useStore } from "easy-peasy";
import { IStore } from "../../store";
import useYoutube from "../../hooks/useYoutube";
import { Redirect } from "react-router";
import { get, range, after } from 'lodash';
import { Button } from '@blueprintjs/core';
// import useMultiKeyPressCallback from "../../hooks/useMultiKeyPressCallback";
// dsd dsdsd dsdsdsdsdss ds
// 123 dsad3dsd dsвыdsd dsds  ds dsds dsd dsds dsds ds2 ds ds  dsa dsd
// 123 dsad3dsdвыв dsdsd dsds  ds dsds dsd dsds dsds ds2 ds ds  dsa dsd
// 123 dsad3dsdвыв dsdsd dsds  ds dsds dsd dsds dsds ds2 ds ds  dsa dsd
/// 123dsd dsds dsds  dsds dsds dsdsd  dsds d sds  dsds  dsd ds d dsds


import styles from './Player.module.css';
import useInterval from '../../hooks/useInterval';
import { func } from "prop-types";
import secondsToMilliseconds from '../../utils/seconds-to-milliseconds';
import useMultiKeyPress from "../../hooks/useMultiKeyPress";

interface PlayerProps {
  [key: string]: any;
}

const jj = JSON.stringify;
const jj2 = JSON.stringify;

type CallbackFunction = () => void;


function Player(props: PlayerProps) {
  const id = props.match.params.id;
  const {
    onFetchSubtitlesFromTasksStore,
  } = useActions((a: Actions<IStore>) => ({
    onFetchSubtitlesFromTasksStore: a.player.fetchSubtitlesFromTasksStore,
  }));

  const timeoutRef = useRef(0);
  const [isSubtitleDisabled, setIsSubtitleDisabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [sbCurrentIndex, setSbCurrentIndex] = useState(0);
  const [sbIsShow, setSbIsShow] = useState(false);
  const currentTask = useStore((s: State<IStore>) => s.getTaskById(Number(id)), [id]);
  const tasksState = useStore((s: State<IStore>) => s.tasks, [id]);
  const playerState = useStore((s: State<IStore>) => s.player, [id]);

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
    width: 600,
    height: 200,
    playerVars: {
      // controls: 0,
      start: 1,
      fs: 0,
      rel: 0,
      disablekb: 1,
      modestbranding: 3,
    },
    events: {
      onReady: ({target}) => {
        target.setVolume(100);
      },
      onStateChange: () => {
        updateSubtitleCurrentIndex();
      }
    },
  });

  // Space key
  useMultiKeyPress(['space'], (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (!player) return;
    if (player.getPlayerState() === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  useMultiKeyPress(['left'], () => {
    if (!player) return;
    checkAndSeek(false);
  });
  useMultiKeyPress(['right'], () => {
    if (!player) return;
    checkAndSeek(true);
  });

  const numKeys = range(0, 10).map((__) => String(__));
  useMultiKeyPress(numKeys, handleNumberKey);

  useEffect(() => {
    if (!player) return;

    let x: number;
    console.log("Run update = ", secondsToMilliseconds(player.getCurrentTime()));

    function update() {
      if (!player) return;

      const sb = playerState.subtitles;
      const size = sb.length;
      const currentSb = sb[sbCurrentIndex];
      const ct = secondsToMilliseconds(player.getCurrentTime());
      const fixCt = ct + 50;

      // console.log("ct = ", ct);
      // console.log("currentSb = ", currentSb);
      // console.log("sbCurrentIndex = ", sbCurrentIndex);
      // console.log("secondsToMilliseconds.........");


      if ((size - 1) <= sbCurrentIndex) {
        return;
      }

      if (fixCt > currentSb.end) {
        const newIndex = sbCurrentIndex + 1;
        console.log("set new index", newIndex);
        setSbCurrentIndex(newIndex);
        return;
      }

      x = requestAnimationFrame(update);
    }

    update();

    return () => {
      if (!x) return;

      cancelAnimationFrame(x);
    }
  }, [player, sbCurrentIndex]);

  function findCurrentSubtitleIndex(time: number): number {
    for (let i = 0; i < playerState.subtitles.length; i++) {
      const videoElement = playerState.subtitles[i];
      if (time >= videoElement.start && time <= videoElement.end) {
        console.log("time.start = ", videoElement.start);
        console.log("time.end = ", videoElement.end);
        return i;
      }
    }

    return 0;
  }

  function updateSubtitleCurrentIndex() {
    if (!player) return;

    const ct = secondsToMilliseconds(player.getCurrentTime());

    const i = findCurrentSubtitleIndex(ct);
    setSbCurrentIndex(i);
  }

  function checkAndSeek(next: boolean) {
    if (!player) return;
    const plainCurrentTime = player.getCurrentTime();
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
        console.log("Prev", index - 1, prevSb);
        player.seekTo(((prevSb.start - 200) / 1000), true);
      }
      if (diff > 800) {
        console.log("Current", currentSb);
        player.seekTo(((currentSb.start - 200) / 1000), true);
      }
    }
  }

  function handleNumberKey(e: KeyboardEvent) {
    const num = Number(e.key);
    if (!player) return;

    const x = (player.getDuration() / 10) * num;
    const seekX = num === 0 ? 0 : x;

    player.seekTo(seekX, true);
  }

  function SubtitlesDebug() {
    if (isSubtitleDisabled) {
      return null;
    }
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

  function SubtitlesDebugFullText() {
    if (!isSubtitleDisabled) {
      return null;
    }

    const subtitles = playerState.subtitles;
    const plainText = subtitles.map((item) => item.text).join(' ');
    const textList = plainText.split('.');


    return (
      <div className={styles.SubtitlesDebugFullText}>
        {textList.map((item, i) => {
          return <p key={i}>{item}.</p>;
        })}
      </div>
    )
  }

  if (props.location.search) {
    const items = playerState.subtitles.map((item, i) => {
      return (
        <div key={i}>
          {item.text}
        </div>
      )
    });
    return (
      <div style={{padding: '40px 40px', backgroundColor: '#fff', lineHeight: '25px', fontSize: 15}}>
        {items}
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div>
        {video}
      </div>
      <div className={styles.debugButtons}>
        <Button onClick={() => player!.playVideo()} text="play"/>
        <Button onClick={() => player!.pauseVideo()} text="pause"/>
        <Button onClick={() => player!.setVolume(10)} text="set vol"/>
        <Button onClick={() => player!.seekTo(50, true)} text="go to 50s"/>
        <Button onClick={() => localStorage.removeItem('app_items')} text="Clear LS"/>
        {/*<Button href text="go to 50s"/>*/}
      </div>
      <div className={styles.container}>
        <div>
        </div>
        <SubtitlesDebug/>
        <SubtitlesDebugFullText/>
      </div>
    </div>
  )
}


export default Player;
