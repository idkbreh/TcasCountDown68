import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import countdownData from './config_day.json';
const { Title, Text } = Typography;

const CountdownTimer = ({ targetDate, title, subtitle, url }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [status, setStatus] = useState('countdown');

  function calculateTimeLeft(target) {
    const targetDay = dayjs(target);
    const now = dayjs();
    const difference = targetDay.diff(now, 'second');
    
    if (difference > 0) {
      const days = Math.floor(difference / (3600 * 24));
      const hours = Math.floor((difference % (3600 * 24)) / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = difference % 60;
      return { days, hours, minutes, seconds };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      const targetDay = dayjs(targetDate);
      const now = dayjs();

      if (targetDay.isSame(now, 'day')) {
        setStatus('today');
      } else if (targetDay.isBefore(now, 'day')) {
        setStatus('passed');
      } else {
        setStatus('countdown');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const renderContent = () => {
    switch (status) {
      case 'today':
        return                 <div style={{
          background: 'rgba(0, 81, 203, 0.62)',
          color: '#fff',
          borderRadius: '8px',
          padding: '8px',
          marginBottom: '4px'
        }}><Title level={1} style={{ color: '#1E3E62' }}>วันนี้!</Title></div>;
      case 'passed':
        return                <Col key={1} span={12}><div style={{
          background: 'rgba(0, 81, 203, 0.62)',
          color: '#fff',
          borderRadius: '8px',
          padding: '2px',
          textAlign:"center",
          marginBottom: '4px'}}><Title level={3} style={{ color: '#fff' }}>ผ่านไปแล้ว</Title></div></Col>;
      default:
        return (
          <Row gutter={[16, 16]} justify="center" align="middle">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <Col key={unit} span={6}>
                <div style={{
                  background: 'rgba(0, 81, 203, 0.62)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px',
                  marginBottom: '4px'
                }}>
                  <Title level={3} style={{ color: '#fff', margin: 0 }}>{value}</Title>
                </div>
                <Text style={{fontSize:'10px'}}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Text>
              </Col>
            ))}
          </Row>
        );
    }
  };

  return (
    <Card
      style={{
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Title level={2} style={{ color: '#1E3E62', marginBottom: '8px' }}>
        {title}
      </Title>
      <Title level={4} style={{ marginBottom: '16px' }}>
        {subtitle}
      </Title>
      
      {renderContent()}

      <a href={url}>
        <Button
          type="primary"
          icon={<ClockCircleOutlined />}
          style={{
            marginTop: '16px',
            background: '#1E3E62',
            borderColor: '#1E3E62'
          }}
        >
          ดูรายละเอียดเพิ่มเติม
        </Button>
      </a>
    </Card>
  );
};

const App = () => {
  return (
    <>
    <h1 className='content' style={{textAlign:'center'}}>Welcome <span style={{color:'#1E3E62'}}>#DEK68</span>  <br/><span className='highlight'>Admission3 Countdown</span></h1>
    <div className='content1'>
      <Row gutter={[16, 16]} justify="center">
        {countdownData.countdowns.map((countdown, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <CountdownTimer
              targetDate={countdown.targetDate}
              title={countdown.title}
              subtitle={countdown.subtitle}
              url={countdown.url}
            />
          </Col>
        ))}
      </Row>
    </div>
    
    <div className="footer">
  <p>@Made with love by DEK68 Student ❤️</p>
</div>
    </>
  );
};

export default App;