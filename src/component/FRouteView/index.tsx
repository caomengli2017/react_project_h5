import { Progress } from 'antd-mobile';
import React, { FC, Suspense, useMemo } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.less';

const PREFIX = 'f-route';
type IFRouteViewProps = {
  animation?: boolean;
};
const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'forward',
};
const FRouteView: FC<IFRouteViewProps> = ({ children, animation = false }) => {
  const location = useLocation();
  const history = useHistory();
  const suspenseSpin = useMemo(() => {
    return (
      <div className="spin">
        <Progress position="fixed" percent={30} />
      </div>
    );
  }, []);
  if (!animation)
    return (
      <div className={PREFIX}>
        <Suspense fallback={suspenseSpin}>
          <Switch location={location}>{children}</Switch>
        </Suspense>
      </div>
    );

  return (
    <div className={PREFIX}>
      <TransitionGroup
        className={`${PREFIX}-wrapper`}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: ANIMATION_MAP[history.action],
          })
        }
      >
        <CSSTransition key={location.pathname} timeout={500}>
          <Suspense fallback={suspenseSpin}>
            <Switch location={location}>{children}</Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default FRouteView;
