import styles from './Team.module.css'

const team = [
    {
        name: 'Salah Swefy',
        jobTitle: 'Frontend Developer',
        image: '/team/salah.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100005129460945',
            twitter: 'https://x.com/Salah_Swefy',
            linkedin: 'https://www.linkedin.com/in/salah-swefy-93ab5a265/',
            github: 'https://github.com/SalahMSwefy',
        },
    },
    {
        name: 'Saad samir',
        jobTitle: 'Frontend Developer',
        image: '/team/saad.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100010070029056',
            twitter: 'https://www.linkedin.com/in/saad-samir-b61724296/',
            linkedin: 'https://www.linkedin.com/in/saad-samir-b61724296/',
            github: 'https://github.com/SaadSamir7',
        },
    },
    {
        name: 'Youssef Megahed',
        jobTitle: 'Backend Developer',
        image: '/team/youssef.jpg',
        social: {
            facebook: 'https://www.facebook.com/bor33y?mibextid=ZbWKwL',
            twitter: 'https://x.com/Bor3yLOL',
            linkedin: 'https://www.linkedin.com/in/youssef-megahed',
            github: 'https://github.com/Bor3y9',
        },
    },
    {
        name: 'mohamed khalil',
        jobTitle: 'Backend Developer',
        image: '/team/khalil.jpg',
        social: {
            facebook: 'https://www.facebook.com/profile.php?id=100045007060763',
            twitter: 'https://x.com/Mohamme67235952',
            linkedin: 'https://www.linkedin.com/in/mohammed-khalil-08565321b/',
            github: 'https://github.com/Bigkhil',
        },
    },
]

function Team() {
    return (
        <div id="team" className={styles.container}>
            <h2 className={styles.mainTitle}>Our Team</h2>
            <div className={styles.team}>
                {team.map((member, index) => (
                    <Member key={index} {...member} />
                ))}
            </div>
        </div>
    )
}

function Member({ name, jobTitle, image, social }) {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src={image} alt={name} />
                </div>
                <ul className={styles.socialIcons}>
                    <li>
                        <a href={social.facebook}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href={social.twitter}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href={social.linkedin}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href={social.github}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
                <div className={styles.details}>
                    <h2>{name}</h2>
                    <p className={styles.jobTitle}>{jobTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Team
