import { useEffect, useState } from 'react'
import styles from './SliderGallery.module.css'

const images = [
    {
        url: '/categories/1.jpg',
        title: 'Mechanical',
    },
    {
        url: '/categories/2.jpg',
        title: 'Electrical',
    },
    {
        url: '/categories/3.jpg',
        title: 'carpentry',
    },
    {
        url: '/categories/4.jpg',
        title: 'painting',
    },
    {
        url: '/categories/5.jpg',
        title: 'Plumber',
    },
    {
        url: '/categories/6.jpg',
        title: 'Worker',
    },
]

const SliderGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Navigate to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        )
    }

    // Navigate to the next slide
    const nextSlide = () => {
        setCurrentIndex((nextIndex) =>
            nextIndex === images.length - 1 ? 0 : nextIndex + 1,
        )
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((currentIndex) =>
                currentIndex === images.length - 1 ? 0 : currentIndex + 1,
            )
        }, 5000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className={styles.sliderContainer} id="categories">
            <h2>Categories</h2>
            <Slider images={images} currentIndex={currentIndex} />
            <PrevArrow onClick={prevSlide} />
            <NextArrow onClick={nextSlide} />
            <Dots
                images={images}
                currentIndex={currentIndex}
                goToSlide={goToSlide}
            />
        </div>
    )
}

export default SliderGallery

function Slider({ images, currentIndex }) {
    return (
        <div className={styles.slider}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${
                        index === currentIndex ? styles.active : ''
                    }`}
                >
                    <img src={image.url} alt={`Slide ${index + 1}`} />
                    <div className={styles.slideInfo}>
                        <p>Category</p>
                        <h3>{image.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PrevArrow({ onClick }) {
    return (
        <button className={styles.prevArrow} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: '24px', height: '24px' }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
    )
}

function NextArrow({ onClick }) {
    return (
        <button className={styles.nextArrow} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: '24px', height: '24px' }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    )
}

function Dots({ images, currentIndex, goToSlide }) {
    return (
        <div className={styles.dots}>
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`${styles.dot} ${
                        index === currentIndex ? styles.active : ''
                    }`}
                    onClick={() => goToSlide(index)}
                />
            ))}
        </div>
    )
}
