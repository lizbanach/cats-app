'use client';

import { useEffect, useState } from 'react';

type BreedCardProps = {
  id: string;
};

const BreedCard = ({ id }: BreedCardProps) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    temperament: '',
    life_span: '',
    origin: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.thecatapi.com/v1/breeds/${id}`;
      const response = await fetch(url, {
        headers: {
          'x-api-key': `${process.env.apiKey}`,
        },
      });
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  const { name, description, temperament, life_span: lifeSpan, origin } = data;

  if (!data) {
    return;
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base/7 font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{description}</p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Temperament</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {temperament}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Life Span</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {lifeSpan} years
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Origin</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {origin}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default BreedCard;