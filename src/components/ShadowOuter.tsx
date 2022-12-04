import styled from "@emotion/styled";
import { css } from "@emotion/react";

const windowFullSize = css`
  width: 100vw;
  height: 100vh;
`;

const outer = css`
  position: absolute;
  inset: 0;
`;

const flexMiddle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShadowOuter = styled.div`
  ${outer};
  ${windowFullSize};

  background-color: hsla(0, 0%, 0%, 0.3);

  ${flexMiddle};

  z-index: 4;
`;

export default ShadowOuter;
