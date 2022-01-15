import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import Error from '../components/Error';

export default function Home() {
	const count = 25;
	const [res, setRes] = useState(null);
	const [err, setErr] = useState(null);
	const noImageLink =
		'http://www.dermalina.com/wp-content/uploads/2020/12/no-image.jpg';

	useEffect(() => {
		const dev = process.env.NODE_ENV !== 'production';
		const server = dev
			? 'http://localhost:3000'
			: 'https://shopify-fe-challenge.ousmanebarry.ca';

		const fetchData = async () => {
			try {
				const response = await fetch(`${server}/api/fetch?count=${count}`);
				const data = await response.json();
				setRes(data);
			} catch (error) {
				setErr(error);
				return error;
			}
		};

		fetchData();
	}, [count]);

	if (!res) return <Loading />;

	if (err) return <Error />;

	return (
		<div className={styles.main}>
			<Nav />
			{res.map((obj) => {
				return (
					<Card
						key={obj.id}
						link={obj.picture || noImageLink}
						copyright={obj.copyright}
						title={obj.title}
						time={obj.date}
						desc={obj.explanation}
					/>
				);
			})}
		</div>
	);
}
