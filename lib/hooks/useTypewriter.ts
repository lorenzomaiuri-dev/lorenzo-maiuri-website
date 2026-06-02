"use client";

import { useEffect, useRef, useState } from "react";

export function useTypewriter(
  commands: string[],
  { typingSpeed = 90, deletingSpeed = 45, pauseFrames = 18, startDelay = 800 } = {},
) {
  const [displayed, setDisplayed] = useState("");
  const state = useRef({ ci: 0, ti: 0, deleting: false, pause: 0 });
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function tick() {
      const s = state.current;
      if (s.pause > 0) {
        s.pause--;
        timeout.current = setTimeout(tick, 80);
        return;
      }
      const cmd = commands[s.ci];
      if (!s.deleting) {
        if (s.ti < cmd.length) {
          s.ti++;
          setDisplayed(cmd.slice(0, s.ti));
          timeout.current = setTimeout(tick, typingSpeed);
        } else {
          s.pause = pauseFrames;
          s.deleting = true;
          timeout.current = setTimeout(tick, typingSpeed);
        }
      } else {
        if (s.ti > 0) {
          s.ti--;
          setDisplayed(cmd.slice(0, s.ti));
          timeout.current = setTimeout(tick, deletingSpeed);
        } else {
          s.deleting = false;
          s.ci = (s.ci + 1) % commands.length;
          timeout.current = setTimeout(tick, 200);
        }
      }
    }

    const initial = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(initial);
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayed;
}
