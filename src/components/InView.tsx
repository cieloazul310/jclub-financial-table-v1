import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from './Loader';

type InViewProps = {
  children: React.ReactNode;
};

function InView({ children }: InViewProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return <div ref={ref}>{inView ? children : <Loader />}</div>;
}

export default InView;
