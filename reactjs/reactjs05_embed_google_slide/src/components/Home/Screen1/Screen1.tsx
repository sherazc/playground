import React from 'react';
import styles from "./Screen1.module.scss"

interface Props {
}

export const Screen1: React.FC<Props> = () => {

    /**
     * Steps to embed google slide.
     * 1. Publish and get the iframe code
     * 2. From iframe, remove all attributes but the src
     * 3. Append &amp;rm=minimal in the src
     * 4. put the iframe in a div
     * 5. Add below styles
     */
/*
.responsive_google_slides {
  position: relative;
  padding-bottom: 56.25%; / * 16:9 Ratio * /
    height: 0;
    overflow: hidden;
}
.responsive_google_slides iframe {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
}
*/
    return (
        <div className={styles.responsive_google_slides}>
            <iframe
                src="https://docs.google.com/presentation/d/e/2PACX-1vRnYHc5Ji0PcgUmguJ1xjl4zBbvIS_z1nfZ78NjgJn9p9dZerMM0tcW9iaHda8OPKSfWwg0GnWXDPl-/embed?start=true&loop=true&delayms=3000&amp;rm=minimal">
            </iframe>
        </div>
    );
}