import React, { Component } from 'react';
import NewsItem from './NewsItem';
import data from './data.json';
import Spinner from './Spinner';

export default class News extends Component {
    constructor(props) {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            pageSize: props.pageSize,
            totalPages: Math.ceil(parseInt(data.totalResults) / props.pageSize)
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async() => {
        this.setState({articles: [], loading: false});

        // const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2e6ee77231d4402e94b1adbc174d9c6c&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        // const result = await fetch(url);
        // const parsedResult = await result.json();
        // this.setState({articles: parsedResult.articles, loading: false});

        setTimeout(() => {
            this.setState({articles: data.articles.slice((this.state.page - 1) * this.state.pageSize, this.state.page * this.state.pageSize), loading: false});
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
                <h1 className="text-center">NewsHub - Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {this.state.articles.map((el) => {
                        return <div className="col-md-4" key={el.url}>
                            <NewsItem title={el.title ? el.title.slice(0, 45) : ""} description={el.description ? el.description.slice(0, 88) : ""} imageUrl={el.urlToImage} newsUrl={el.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.loading || this.state.page === 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.loading || this.state.page === this.state.totalPages} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
