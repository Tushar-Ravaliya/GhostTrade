import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroText from '../Components/AboutUs/HerotText';
import Card from '../Components/AboutUs/Card';

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8000/api/v1/about');
        if (data.statusCode === 200) {
          setAboutData(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
      <HeroText
        title={aboutData?.heroTitle}
        subtitle={aboutData?.heroSubtitle}
        loading={loading}
      />
      <Card
        features={aboutData?.features || []}
        loading={loading}
      />
    </>
  );
}
