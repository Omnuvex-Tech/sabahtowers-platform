import Image from 'next/image';
import styles from '../../styles/Amenities/amenities.module.css';

export interface AmenityItem {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

interface AmenitiesUIProps {
  eyebrow: string;
  title: string;
  items: AmenityItem[];
}

export function AmenitiesUI({ eyebrow, title, items }: AmenitiesUIProps) {
  return (
    <section className={styles.amenities}>
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <span className={styles.eyebrowLine} />
      </div>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <Image
              src={item.iconSrc}
              alt={item.iconAlt}
              width={44}
              height={44}
              className={styles.icon}
            />
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}