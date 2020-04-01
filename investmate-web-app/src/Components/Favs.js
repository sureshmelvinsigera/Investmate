import React, {useContext, useState} from 'react';
import { StocksContext } from '../App'
import { Link } from 'react-router-dom';
import {Button, Card, CardBody, CardText, CardTitle, Spinner} from "reactstrap";

function Favs() {
    const sharedStates = useContext(StocksContext)


    console.log("Favs = ",sharedStates.favs)

    function removeFavs(index){
        const copyFavs = [...sharedStates.favs]
        copyFavs.splice(index,1)
        localStorage.setItem("favs", JSON.stringify(copyFavs));
        sharedStates.setFavs(copyFavs)
    }

    // Update selected stock symbol when card is clicked
    function handleStockSelection(symbl) {
        localStorage.setItem("lastSelectedSymbol", symbl)
        sharedStates.setSelectedSymbl(symbl)
    }

    let headingStatement = "Companies you're currently tracking";
    if(sharedStates.favs.length < 1) headingStatement = "It doesn't look like you've added a company to track yet..."

    const favCards = sharedStates.favs.map( (fav, index) => {

        return(
            <div className="research-cards-cardContainer" key={index}>
                <Link
                    to={`/details/${fav.overview.symbol}`}
                    onClick={() => handleStockSelection(fav.overview.symbol)} >
                    <Card>
                        <div className="research-cards-iconContainer" >
                            {fav.hasOwnProperty("imgURL") ? <img className="research-cards-iconContainer__icon" src={fav.imgURL}/> : <Spinner color="secondary"/>}
                        </div>
                        <CardBody>
                            <CardTitle>{fav.overview.companyName}</CardTitle>
                            <CardText>({fav.overview.symbol})</CardText>
                            <CardText><a href={fav.overview.website}>{fav.overview.website}</a></CardText>
                            <CardText>Exchange: {fav.overview.exchange}</CardText>
                            {/*<div className="research-cards-cardContainer__spacer"/>*/}
                            <Button
                                color="primary"
                                size="lg"
                                onClick={() => removeFavs(index)}
                                block>Stop tracking {fav.overview.symbol}</Button>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        )
    });

    return (
        <div className="favsContainer">
            <h1>{headingStatement}</h1>
            <div className="research-cards favs-card-container">
                {favCards}
            </div>
        </div>
    );
}

export default Favs;
