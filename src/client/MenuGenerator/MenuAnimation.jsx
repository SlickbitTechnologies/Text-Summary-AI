import React from 'react';
import {motion} from 'framer-motion';

const MenuAnimation = () => {
    return(
        <motion.div
            style={{backgroundColor: "#1A76D2",width: "15%",height: "15%", marginLeft: 150, marginTop: 100}}
            className="handle"
            initial={{ x: -100 }}
            animate={{ x: 100 }}
            transition={{
                type: "spring",
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.1
            }}
        />
        // <motion.div
        //     style={{backgroundColor: "pink",width: "15%",height: "15%", marginLeft: 20, marginTop: 50}}
        //         className="box"
        //         initial="initial"
        //         animate={{
        //             // scale: [1, 2, 2, 1],
        //             rotate: [0, 200, 200, 0],
        //             // borderRadius: ["0%", "0%", "50%", "50%", "30%"],
        //             x: [0,200,200,0]
        //         }}
        //         transition={{
        //             duration: 2,
        //             // ease: "easeInOut",
        //             // times: [0, 0.2, 0.5, 0.8, 1],
        //             repeat: Infinity,
        //             repeatDelay: 1
        //         }}
        // />
    )
}

export default MenuAnimation;