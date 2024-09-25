import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Letters of the Saints',
    Svg: require('@site/static/img/hp_letters_of_saints.svg').default,
    description: (
      <>
        Archive of revered religious figures throughout history. Explore what
        the Saints had to say about a variety of topics.
      </>
    ),
  },
  {
    title: 'Church father writings',
    Svg: require('@site/static/img/hp_church_father_writings.svg').default,
    description: (
      <>
        Influential Christian leaders and theologians of the 1st to 3rd
        centuries AD. These early bishops, and martyrs played a crucial role in
        shaping Christian doctrine, interpreting scripture, and establishing
        church traditions.
      </>
    ),
  },
  {
    title: 'Curated Reading Lists',
    Svg: require('@site/static/img/hp_curated_reading-lists.svg').default,
    description: (
      <>
        Learn about the rich traditions of Orthodox Christianity. Our curated
        reading lists guide you from the foundations of the faith to the
        profound depths of Orthodox theology and practice.
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
