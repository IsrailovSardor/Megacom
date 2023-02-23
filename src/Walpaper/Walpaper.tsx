import css from './index.module.scss'
import cx from 'classnames'

const AnimationWalpaper = () => {
    return (
        <div className={css.wrapper}>
            <div className={cx(css.circle1, css.circle)} ></div>
            <div className={cx(css.circle2, css.circle)} ></div>
            <div className={cx(css.circle3, css.circle)} ></div>
        </div>
    );
};

export default AnimationWalpaper;