import React from 'react'
import '../styles/homepage.css'

type Product = {
	id: number
	name: string
	price: string
	image?: string
}

const sampleProducts: Product[] = [
	{ id: 1, name: 'חולצה מודפסת', price: '₪79', image: '/assets/product-1.jpg' },
	{ id: 2, name: "ג'קט קלאסי", price: '₪249', image: '/assets/product-2.jpg' },
	{ id: 3, name: 'נעלי ספורט', price: '₪199', image: '/assets/product-3.jpg' },
	{ id: 4, name: 'כיסא עיצוב', price: '₪399', image: '/assets/product-4.jpg' }
]

export default function Homepage() {
	return (
		<div className="homepage">
			<header className="hero">
				<div className="hero-inner">
					<h1>ברוכים הבאים לחנות שלנו</h1>
					<p>מגוון מוצרים איכותיים במחירים הטובים ביותר. משלוח חינם בקנייה מעל ₪199.</p>
					<a className="cta" href="#products">קנה עכשיו</a>
				</div>
			</header>

			<section id="products" className="products">
				<h2>מוצרים מובחרים</h2>
				<div className="grid">
					{sampleProducts.map(p => (
						<article key={p.id} className="card">
							<div className="thumb" style={{backgroundImage: `url(${p.image})`}} />
							<div className="card-body">
								<h3>{p.name}</h3>
								<div className="price">{p.price}</div>
								<button className="add">הוסף לעגלה</button>
							</div>
						</article>
					))}
				</div>
			</section>

			<footer className="site-footer">
				<div>© {new Date().getFullYear()} חנות הדגמה — כל הזכויות שמורות</div>
			</footer>
		</div>
	)
}
