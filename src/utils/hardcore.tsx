import { nextTick, timeout } from "q";
import * as React from "react";
import { Button } from "@blueprintjs/core";
import { useState } from "react";

// nextTick()
// setTimeout(()=> {
//
// }, 0);

const Subtitles = [
  {
    "start": 220,
    "end": 1220,
    "text": "Hi!"
  },
  {
    "start": 1220,
    "end": 5299,
    "text": "I'm Vanessa, from SpeakEnglishWithVanessa.com."
  },
  {
    "start": 5299,
    "end": 8480,
    "text": "Do I speak slowly?"
  },
  {
    "start": 8480,
    "end": 15280,
    "text": "Let's talk about it."
  },
];

interface Props {
  sb: any[],
}

class Kek extends React.Component<Props> {
  private index: number = 0;
  private currentTime: number = 0;

  constructor(props: any) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();

    const x = setInterval(() => {
      if (this.currentTime > 6000) {
        clearInterval(x);
        return;
      }

      this.currentTime += 100;
    }, 100);
  }

  update() {
    const sb = this.props.sb;
    const size = sb.length;
    const ct = this.currentTime;

    const currentSb = sb[this.index];

    if ((size - 1) <= this.index) {
      return;
    }

    if (ct > currentSb.end) {
      this.index += 1;
      this.forceUpdate();
    }

    requestAnimationFrame(this.update);
  }


  updateOld() {
    const timeout = 222;
    const sb = this.props.sb;
    const size = sb.length;

    const currentSb = sb[this.index];
    console.log("currentSb = ", currentSb);

    setTimeout(() => {
      if ((size - 1) <= this.index) {
        return;
      }

      this.index = this.index + 1;
      this.updateOld();
    }, timeout);
  }

  render(): React.ReactNode {
    return <div>
      <pre>{this.props.sb[this.index].text}</pre>
    </div>;
  }
}

export default function () {
  const sb = Subtitles;

  const [x, setX] = useState(Math.random());

  return (
    <div>
      <Kek sb={sb}/>

      <hr/>


      <Button text={"123"} onClick={()=> setX(Math.random())}/>
      <hr/>
      <pre>{x}</pre>
    </div>
  );
}
