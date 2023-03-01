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
        super();
        
        switch(props.category){
            case 'business':
                this.data = {
                    articles: business.articles, 
                    totalPages: Math.ceil(parseInt(business.totalResults) / props.pageSize)
                };
            break;
            case 'entertainment':
                this.data = {
                    articles: entertainment.articles,
                    totalPages: Math.ceil(parseInt(entertainment.totalResults) / props.pageSize)
                };
            break;
            case 'general':
                this.data = {
                    articles: general.articles,
                    totalPages: Math.ceil(parseInt(general.totalResults) / props.pageSize)
                };
            break;
            case 'health':
                this.data = {
                    articles: health.articles,
                    totalPages: Math.ceil(parseInt(health.totalResults) / props.pageSize)
                };
            break;
            case 'science':
                this.data = {
                    articles: science.articles,
                    totalPages: Math.ceil(parseInt(science.totalResults) / props.pageSize)
                };
            break;
            case 'sports':
                this.data = {
                    articles: sports.articles,
                    totalPages: Math.ceil(parseInt(sports.totalResults) / props.pageSize)
                };
            break;
            case 'technology':
                this.data = {
                    articles: technology.articles,
                    totalPages: Math.ceil(parseInt(technology.totalResults) / props.pageSize)
                };
            break;
            default:
            break;
        }

        this.state = {
            articles: [],
            loading: true,
            page: 1
        }

        document.title = `NewsHub - ${this.capitalize(props.category)}`;
    }

    capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async() => {
        this.setState({articles: [], loading: true});

        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e6ee77231d4402e94b1adbc174d9c6c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // const result = await fetch(url);
        // const parsedResult = await result.json();
        // this.setState({
        //     articles: parsedResult.articles, 
        //     loading: false,
        //     totalPages: Math.ceil(parseInt(parsedResult.totalResults) / this.props.pageSize)
        // });

        setTimeout(() => {
            this.setState({
                articles: this.data.articles.slice(
                    (this.state.page - 1) * this.props.pageSize, this.state.page * this.props.pageSize), 
                loading: false, totalPages: 
                this.data.totalPages});
        }, 1000);
    }

    handlePreviousClick = () => {
        this.setState({page: this.state.page - 1});
        this.fetchData();
    }

    handleNextClick = () => {
        this.setState({page: this.state.page + 1});
        this.fetchData();
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsHub - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((el) => {
                        return <div className="col-md-4" key={el.url}>
                            <NewsItem title={el.title ? el.title.slice(0, 45) : ""} description={el.description ? el.description.slice(0, 88) : ""} imageUrl={el.urlToImage} newsUrl={el.url} author={el.author} date={el.publishedAt} source={el.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.loading || this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.loading || this.state.page >= this.state.totalPages} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
