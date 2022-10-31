import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import MainImg from '../Images/hero.png'
import GetStartImg from '../Images/hackathon_transparent.png'
import './Marketplace.css'
import Cards from "./Card";
import CardImg from "../Images/doge-computer.png"
import WhatNFT from '../Images/what-is-ethereum.png';
import impact_transparent from '../Images/impact_transparent.png'
import future_transp from '../Images/future_transparent.jpg'
import infra_transp from '../Images/infrastructure_transparent.jpg'

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "Alchemy's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "Alchemy's Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "Alchemy's Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

const nav = (link) => {
    window.location.href=link
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
        <div>
            <img src={MainImg}>

            </img>
            <div className="Welcome">
            <div style={{width: '30%', marginInline: 'auto'}} className="md:text-xl mt-5 flex flex-col place-items-center font-bold">
              <h1>Welcome To NFT Marketplace</h1>
              <p>NFT is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.</p>
            </div>
            </div>
            <div style={{display: 'flex', marginTop: '10%'}}>
                <div className="intro_container">
                  <h1>Get Started</h1>
                  <p>ethereum.org is your portal into the world of Ethereum. The tech is new and ever-evolving – it helps to have a guide. Here's what we recommend you do if you want to dive in.</p>
                </div>
                <img className="getstarted_img" src={GetStartImg}></img>
            </div>
        </div>
            <div className="md:text-xl mt-5 font-bold">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>

            <div className="Card_grid">
                <Cards img={CardImg} heading='Pick a Wallet' info='A wallet lets you connect..........' onClick={()=>{
                    nav('https://ethereum.org/en/wallets/find-wallet/')
                }} >
                </Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
            </div>

            <div style={{display: 'flex', marginTop: '200px'}}>
            <img style={{padding: '5px', margin: '10px'}} className="getstarted_img" src={WhatNFT}></img>
            <div className="intro_container">
                <h1>What is NFT Marketplace</h1>
                <p>Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet.</p>
            </div>
            </div>

            <div style={{display: 'flex'}}>
            <div className="intro_container">
                <h1>A fairer financial system</h1>
                <p>Today, billions of people can’t open bank accounts, others have their payments blocked. Ethereum's decentralized finance (DeFi) system never sleeps or discriminates. With just an internet connection, you can send, receive, borrow, earn interest, and even stream funds anywhere in the world.</p>
            </div>
            <img className="getstarted_img" src={impact_transparent}></img>
            </div>

            <div style={{display: 'flex'}}>
            <img className="getstarted_img" src={infra_transp}></img>
            <div className="intro_container">
                <h1>The internet of assets</h1>
                <p>Ethereum isn't just for digital money. Anything you can own can be represented, traded and put to use as non-fungible tokens (NFTs). You can tokenise your art and get royalties automatically every time it's re-sold. Or use a token for something you own to take out a loan. The possibilities are growing all the time.</p>
            </div>
            </div>

            <div style={{display: 'flex'}}>
            <div className="intro_container">
                <h1>An open internet</h1>
                <p>Today, we gain access to 'free' internet services by giving up control of our personal data. Ethereum services are open by default – you just need a wallet. These are free and easy to set up, controlled by you, and work without any personal info.</p>
            </div>
            <img className="getstarted_img" src={future_transp}></img>
            </div>

            <div className="mt-10">
                <h1>Explore NFT Marketplace</h1>

                <div className="Card_grid">
                  <Cards></Cards>
                  <Cards></Cards>
                </div>
            </div>
        </div>   

    </div>
);

}