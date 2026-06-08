import {Header} from "../index";
import {Footer} from "../index";
import styles from "./layout.module.css";

export const Layout = ({children}) => {
    return(
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
