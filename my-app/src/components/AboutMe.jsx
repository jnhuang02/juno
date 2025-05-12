import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import pfp from "../imgs/pfp.png";

const AboutMe = () => {
    return (
        <div className="sm:px-6 med:pt-52 md:pt-40 md:px-32 font-primary ">
            <div className="flex items-start space-x-8">
                {/* Enlarged Profile Picture */}
                <img
                    className="border-4 border-green-500 rounded-full w-32 h-32 md:w-40 md:h-40"
                    src={pfp}
                    alt="Profile Picture"
                />

                {/* Speech Bubble */}
                <div className="relative bg-gray-200 text-black text-lg md:text-xl font-bold p-6 rounded-lg max-w-lg md:max-w-2xl">
                    {/* Speech Bubble Tail */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-3 -translate-y-1/2 w-0 h-0 
                        border-t-8 border-t-transparent 
                        border-b-8 border-b-transparent 
                        border-r-8 border-r-gray-200">
                    </div>

                    {/* Typing Animation */}
                    <TypeAnimation
                        sequence={[
                            "Hello, my name is Justin.",
                            1000,
                            "I am an upcoming master's student at UCLA.",
                            1000,
                            "I studied Math-Computer Science at UCSD.",
                            1000,
                            "I love front-end development & machine learning.",
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        cursor={true}
                        className="block text-2xl md:text-3xl"
                    />
                </div>
            </div>

            {/* About Me Text */}
            <div className="p-4 pt-16 pb-6 break-words md:text-xl">
            <p>
                   My name is Justin, and I am currently a graduate student at UCLA pursuing a Master's in
                   Applied Statistics and Data Science. I am currently working with Large Language Models such as 
                   bert, cnn, and rnn.
                </p>
                <br />
                
                <p>
                    I did my undergraduate at UCSD with a bachelor's in Math-Computer Science along with a minor in Data Science and Business-Economics.
                    In my spare time, I like to stay active by lifting weights, running, swimming, and playing basketball with friends. I am also expanding my musical prowess by learning how to DJ and play the guitar.
                </p>
                <br />
                <p>
                    Outside of my hobbies, I worked as an instructional assistant for Calculus I and Vector Calculus at UCSD during my undergraduate years. 
                    I hosted my own office hours, assisted students in discussion sections, and graded tests and homework assignments. I was also a proctor for the Triton Testing Center, 
                    where I monitored students and upheld the academic integrity standards on campus.
                </p>
                <br />
                <p className="italic text-lg md:text-xl text-gray-400">
                    I enjoy front-end development, while at the same time having a keen interest in machine learning and data science. 
                    I believe that data is another way to tell stories, and deciphering the meaning behind data can greatly contribute to technological advancements and drive society forward.
                </p>
            </div>
        </div>
    );
};

export default AboutMe;
