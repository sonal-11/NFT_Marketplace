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
import ethe from '../Images/eth.png'
import wallet from '../Images/wallet-cropped.png'
import developer from '../Images/developers-eth-blocks.png'
import merge from '../Images/merge.png'
import finance from '../Images/finance_transparent.png'

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
        <div className="flex flex-col place-items-center mt-5">
        <div>
            <img alt="" src={MainImg}></img>
            <div className="Welcome">
            <div style={{width: '30%', marginInline: 'auto'}} className="md:text-xl mt-5 flex flex-col place-items-center font-bold">
              <h1 className="wetxt">Welcome To NFT Marketplace</h1>
              <p className="semi_txt">NFT is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications.</p>
            </div>
            </div>
            <div style={{display: 'flex', marginTop: '5%'}}>
                <div className="intro_container">
                  <h1 className="wetxt">Get Started</h1>
                  <p className="semi_txt">ethereum.org is your portal into the world of Ethereum. The tech is new and ever-evolving – it helps to have a guide. Here's what we recommend you do if you want to dive in.</p>
                </div>
                <img alt="" className="getstarted_img" src={GetStartImg}></img>
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
                <Cards img={CardImg} heading='Pick a Wallet' info='A wallet lets you connect to Ethereum and manage your funds.' onClick={()=>{
                    nav('https://ethereum.org/en/wallets/find-wallet/')
                }} >
                </Cards>
                <Cards img={ethe} heading='Get ETH' info='ETH is the currency of Ethereum - you can use it in applications.'></Cards>
                <Cards img={wallet} heading='Use a dapp' info='Dapps are applications powered by Ethereum. See what you can do.'></Cards>
                <Cards img={developer} heading='Start building' info='If you want to start coding with Ethereum, we have documentation, tutorials, and more in our developer portal'></Cards>
            </div>

            <div style={{display: 'flex', marginTop: '200px',backgroundColor: '#ccfcff'}}>
            <img alt="" style={{padding: '5px', margin: '10px'}} className="getstarted_img" src={WhatNFT}></img>
            <div className="intro_container">
                <h1 className="wetxt">What is NFT Marketplace</h1>
                <p className="semi_txt">
                    Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet.  
                </p>
                <button className="share_btn">What is Ethereum?</button>
            </div>
            </div>

            <div style={{display: 'flex', backgroundColor: '#ffe3d3'}}>
            <div className="intro_container">
                <h1 className="wetxt">A fairer financial system</h1>
                <p className="semi_txt">Today, billions of people can’t open bank accounts, others have their payments blocked. Ethereum's decentralized finance (DeFi) system never sleeps or discriminates. With just an internet connection, you can send, receive, borrow, earn interest, and even stream funds anywhere in the world.</p>
            </div>
            <img alt="" className="getstarted_img" src={impact_transparent}></img>
            </div>

            <div style={{display: 'flex', backgroundColor: '#ccfcff'}}>
            <img alt="" className="getstarted_img" src={infra_transp}></img>
            <div className="intro_container">
                <h1 className="wetxt">The internet of assets</h1>
                <p className="semi_txt">Ethereum isn't just for digital money. Anything you can own can be represented, traded and put to use as non-fungible tokens (NFTs). You can tokenise your art and get royalties automatically every time it's re-sold. Or use a token for something you own to take out a loan. The possibilities are growing all the time.</p>
            </div>
            </div>

            <div style={{display: 'flex', backgroundColor: '#ffe3d3'}}>
            <div className="intro_container">
                <h1 className="wetxt">An open internet</h1>
                <p className="semi_txt">Today, we gain access to 'free' internet services by giving up control of our personal data. Ethereum services are open by default – you just need a wallet. These are free and easy to set up, controlled by you, and work without any personal info.</p>
            </div>
            <img alt="" className="getstarted_img" src={future_transp}></img>
            </div>

            <div className="mt-10">
                <h1 className="wetxt">Explore NFT Marketplace</h1>

                <div className="Card_grid">
                  <Cards img={merge} heading='Level up your knowledge' info='The NFT Marketplace roadmap consists of interconnected upgrades designed to make the network more scalable, secure, and sustainale'></Cards>
                  <Cards img={infra_transp} heading='NFT Marketplace for enterprise' info='See how Ethereum can open up new buisness models, reduce your costs and future-proof your business'></Cards>
                </div>
            </div>

            <div style={{display: 'flex', backgroundColor: '#DEE7FB', margin: '100px'}}>
              <div className="intro_container">
                  <h1 className="wetxt">This website is open source with hundreds of community contributors. You can propose edits to any of the content on this site, suggest awesome new features, or help us squash bugs.</h1>
              </div>
              <img className="getstarted_img" alt="" src={finance}></img>
            </div>
        </div>   

    </div>
);

}