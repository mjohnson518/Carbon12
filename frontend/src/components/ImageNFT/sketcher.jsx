import { DIMENSIONS, sketch } from '@pob/sketches';
import { useEffect, useRef } from 'react';



const LargeCardWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const AnimatedLargeCardWrapper = animated(LargeCardWrapper);

const LargeCardWebglContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  cursor: ${(p) =>
    p.isExpanded === undefined
      ? 'cursor'
      : p.isExpanded
      ? p.isArtFocused
        ? 'url(/cursor/expand.svg) 20 20, pointer'
        : 'url(/cursor/shrink.svg) 20 20, pointer'
      : 'url(/cursor/click.svg) 20 20, pointer'};
`;

const LargeCardWebglScaleWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ALargeCardWebglScaleWrapper = animated(LargeCardWebglScaleWrapper);

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 0;
`;

const AnimatedImage = animated(StyledImage);
const AnimatedCanvas = animated(StyledCanvas);

const UnMemoizedWebglDrawer = ({ onHasDrawn, prerenderPayload }) => {
  const canvasRef = useRef(null);
  // const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // if (hasDrawn) {
    //   return;
    // }

    canvasRef.current.width = DIMENSIONS[0];
    canvasRef.current.height = DIMENSIONS[1];
    const gl = canvasRef.current.getContext('webgl');

    const sketchContext = {
      gl,
      width: DIMENSIONS[0],
      height: DIMENSIONS[1],
    };

    // setHasDrawn(true);
    onHasDrawn?.();
    const sketcher = sketch(
      sketchContext,
      prerenderPayload.data,
      prerenderPayload.gene,
    );

    sketcher.render();

    return () => {
      sketcher.end();
      if (!!gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [onHasDrawn, canvasRef, prerenderPayload]);

  return <AnimatedCanvas ref={canvasRef} />;
};
