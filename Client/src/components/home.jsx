import styles from "../styles/home.module.css"

import Header from "./header"
import Summary from "./summary"
import Gain from "./gain"
import Loss from "./loss"


const home = () => {
    return(
        <>
            <Header />
            <div className={styles.main}>
                <Summary />
                <Gain />
                <Loss />
            </div>
        </>
    )
}

export default home