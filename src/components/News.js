import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const global = false;
    //document.title = `NewsHub - ${capitalize(props.category)}`;

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    useEffect(() => {
        fetchData();  
    }, [])

    const fetchData = async() => {
        props.setProgress(10);

        if(global) {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            const result = await fetch(url);
            props.setProgress(30);
            const parsedResult = await result.json();
            props.setProgress(70);
            setArticles(articles.concat(parsedResult.articles));
            setTotalResults(parsedResult.totalResults);
            setLoading(false);
            props.setProgress(100);
        } else {
            setTimeout(() => {
                setArticles(articles.concat(props.data.articles.slice((page - 1) * props.pageSize, page * props.pageSize)));
                setTotalResults(props.data.totalResults);
                setLoading(false);
                props.setProgress(100);
            }, 1500);
            setTimeout(() => {
                props.setProgress(30);
            }, 500);
        }
    }

    const fetehMoreData = () => {
        setPage({page: page + 1});
        fetchData();
    }

    return (
        <>
            <h1 className="text-center my-3">NewsHub - Top {capitalize(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetehMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((el) => {
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

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;