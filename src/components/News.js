import React, { Component } from 'react';
import NewsItem from './NewsItem';
import business from '../data/business.json';
import entertainment from '../data/entertainment.json';
import general from '../data/general.json';
import health from '../data/health.json';
import science from '../data/science.json';
import sports from '../data/sports.json';
import technology from '../data/technology.json';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        
        switch(props.category){
            case 'business':
                this.data = business;
            break;
            case 'entertainment':
                this.data = entertainment;
            break;
            case 'general':
                this.data = general;
            break;
            case 'health':
                this.data = health;
            break;
            case 'science':
                this.data = science;
            break;
            case 'sports':
                this.data = sports;
            break;
            case 'technology':
                this.data =  technology;
            break;
            default:
            break;
        }

        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: true,
            global: false
        }

        document.title = `NewsHub - ${this.capitalize(props.category)}`;
    }

    capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async() => {
        this.props.setProgress(10);

        if(this.state.global) {
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            const result = await fetch(url);
            this.props.setProgress(30);
            const parsedResult = await result.json();
            this.props.setProgress(70);
            this.setState({
                articles: this.state.articles.concat(parsedResult.articles),
                totalResults: parsedResult.totalResults,
                loading: false
            });
            this.props.setProgress(100);
        } else {
            setTimeout(() => {
                this.setState({
                    articles: this.state.articles.concat(this.data.articles.slice(
                        (this.state.page - 1) * this.props.pageSize, this.state.page * this.props.pageSize)), 
                    totalResults: this.data.totalResults,
                    loading: false
                });
                this.props.setProgress(100);
            }, 1500);
            setTimeout(() => {
                this.props.setProgress(30);
            }, 500);
        }
    }

    fetehMoreData = () => {
        this.setState({page: this.state.page + 1});
        this.fetchData();
    }

    render() {
        return (
            <>
                <h1 className="text-center my-3">NewsHub - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetehMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((el) => {
                                return <div className="col-md-4" key={el.url}>
                                    <NewsItem title={el.title ? el.title.slice(0, 45) : ""} description={el.description ? el.description.slice(0, 88) : ""} imageUrl={el.urlToImage} newsUrl={el.url} author={el.author} date={el.publishedAt} source={el.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
