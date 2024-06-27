import { useState, useEffect } from 'react';
import styles from '@/styles/lista.module.css';
import { GetStaticProps } from 'next';
import { ICity } from '@/types/city.d';

interface ListaProps {
  initialCities: Array<ICity>;
  generatedAt: string;
}

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function Lista({ initialCities, generatedAt }: ListaProps) {
  const [cities, setCities] = useState<Array<ICity>>(initialCities);
  const [timestamp, setTimestamp] = useState<string>(generatedAt);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities/10`);
      const data = await response.json();

      if (response.ok) {
        setCities(data);
        setTimestamp(new Date().toISOString());
      }
    }, 60000);

    return () => clearInterval(interval); 
  }, []); 
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>

        <div data-list-container>
          {cities.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
        <div className={styles.generate}>Gerado em: {formatDate(timestamp)}</div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities/10`);
  const initialCities = await response.json();

  if (!response.ok) {
    throw new Error('Erro ao obter os dados');
  }

  return {
    props: {
      initialCities,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 60, 
  };
};
