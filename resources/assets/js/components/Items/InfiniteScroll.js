import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * This component uses the `IntersectionObserver` API:
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export default class InfiniteScroll extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        onScrollBottom: PropTypes.func.isRequired,
        shouldFetch: PropTypes.func.isRequired,

        /**
         * This component utilizes the concept of a "sentinel", which is a "a soldier or guard whose job is to stand and
         * keep watch." The sentinel is an element in the feed whose job is to "watch" for when it scrolls into view,
         * triggering any additional fetching that is needed to get the data. With that new data appended to the feed,
         * a new sentinel element is assigned with those new feed items taken into consideration.
         */

        /**
         * `sentinelOffset` determines how far back from the bottom of the feed that the sentinel element is assigned.
         * With an offset of 5, and 20 feed items, the 16th element would be the sentinel.
         */
        sentinelOffset: PropTypes.number.isRequired,
        sentinelClassName: PropTypes.string,

        // `threshold` is the value based to the `IntersectionObserver` instance
        threshold: PropTypes.number.isRequired,
        scrollWrapperClassName: PropTypes.string
    }

    static defaultProps = {
        sentinelOffset: 10,
        sentinelClassName: 'infinite-scroll-sentinel',
        threshold: 0.1,
        scrollWrapperClassName: ''
    }

    state = {
        isFetching: false,

        /**
         * Keeps track of which feed element is the sentinel.
         */
        sentinelIdx: null
    }

    _observer: null

    componentDidMount () {
        this.addIntersectionObserver();
    }

    componentWillUnmount () {
        if (this._observer) {
            this.removeObserver();
        }
    }

    removeObserver () {
        if (this.state.sentinelIdx && this._observer) {
            this._observer.unobserve(findDOMNode(this).children[this.state.sentinelIdx]);
        }

        this._observer = null;
    }

    componentDidUpdate (prevProps, prevState) {
        const {
            sentinelClassName,
        } = this.props;
        const { children: prevChildren } = prevProps;
        const { children: nodeChildren } = findDOMNode(this);
        const { sentinelIdx } = this.state;
        const prevSentinelIdx = prevState.sentinelIdx;

        // If we have a change in our sentinel index, let's make the necessary changes.
        if (sentinelIdx && sentinelIdx !== prevSentinelIdx) {
            const child = nodeChildren[sentinelIdx];

            if (!child) {
                return;
            }

            child.classList.add(sentinelClassName);
            if (prevSentinelIdx && typeof nodeChildren[prevSentinelIdx] !== 'undefined') {
                this._observer.unobserve(nodeChildren[prevSentinelIdx]);
            }
            this._observer.observe(nodeChildren[sentinelIdx]);
        }

        if (prevChildren.length !== nodeChildren.length) {
            this.setSentinel();
        }

        if (prevSentinelIdx && !sentinelIdx) {
            const child = nodeChildren[prevSentinelIdx];

            if (!child) {
                return;
            }

            child.classList.remove(sentinelClassName);
            this._observer.unobserve(nodeChildren[prevSentinelIdx]);
        }
    }

    setSentinel = () => {
        this.setState(prevState => {
            const { sentinelOffset } = this.props;
            const { children: nodeChildren } = findDOMNode(this);
            const sentinelIdx = !this.props.shouldFetch() ? null : nodeChildren.length - sentinelOffset;

            return { sentinelIdx };
        });
    }

    addIntersectionObserver () {
        this._observer = new IntersectionObserver(this.onScroll, {
            threshold: this.props.threshold
        });

        this.setSentinel();
    }

    onScroll = (entries, observer) => {
        if (entries[0].isIntersecting && !this.state.isFetching && this.props.shouldFetch()) {
            this.setState({
                isFetching: true
            }, () => {
                this.props.onScrollBottom(this.setSentinel).then(() => {
                    this.setState({
                        isFetching: false
                    });
                });
            });
        }
    }

    render () {
        return (
            <div className={this.props.scrollWrapperClassName}>
                {this.props.children}

                {
                    this.state.isFetching &&
                    <div className="list-group-item loady">
                        <div className="helper"></div>
                        <span
                            className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
                        </span>
                    </div>
                }
            </div>
        );
    }
}
