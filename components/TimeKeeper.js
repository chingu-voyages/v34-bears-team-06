import { useState, useEffect, useLayoutEffect } from "react";
import { Box, Image, Flex, Spacer, Badge, Heading } from "@chakra-ui/react";

export default function TimeKeeper() {
  const [time, setTime] = useState(Date.now());

  useLayoutEffect(() => {
    setInterval(function () {
      const today = new Date();
      let h = today.getHours();

      //   Selects between AM/PM, then removes 12 from hours if past noon
      let ampm = h >= 12 ? "PM" : "AM";
      h = h % 12;
      h = h ? h : 12;

      //   Adds a '0' if the minute count is < 10
      let m = today.getMinutes();
      let min = m < 10 ? `0${m}` : m;

      //   Adds a '0' if the second count is < 10
      let s = today.getSeconds();
      let sec = s < 10 ? `0${s}` : s;
      
      setTime(`${h}:${min}:${sec} ${ampm}`);
    }, 1000);
  });

  return (
    <div time={time} setTime={setTime}>
      <Heading as="h3" size="lg">
        Time: {time}
      </Heading>
    </div>
  );
}
