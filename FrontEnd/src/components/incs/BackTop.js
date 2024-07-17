import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from "antd";
import { FaArrowUp } from "react-icons/fa6";
import './BackTop.css';
function BackTop() {
    const [backTopButton,setbackTopButton]=useState(false);
    useEffect(
        () =>{
            window.addEventListener("scroll", () =>{
                if(window.scrollY>100){
                    setbackTopButton(true)
                }else{
                    setbackTopButton(false)
                }
                }
            )    
            },[])
            const scrollUp = () =>{
                window.scrollTo(
                    {
                        top:0,
                        behavior:'smooth'
                    }
                )
            }
            return  <div className={`back-top-container ${backTopButton ? 'show' : 'hide'}`}>
            <Button type="primary" onClick={scrollUp} className="back-top-button">
                <FaArrowUp />
            </Button>
        </div>;
        }
export default BackTop;
