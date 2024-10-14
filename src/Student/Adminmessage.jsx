import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-carousel-minimal';

const Adminmessage = () => {
  const [adminnotification, setAdminNotification] = useState([]);
  
  // Conditionally create the data array only when adminnotification[0] exists
  const data = adminnotification[0] ? [
    { image: adminnotification[0].image },
    { image: adminnotification[0].imagetwo },
    { image: adminnotification[0].imagethree }
  ] : [];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }

  const adminnotifications = async () => {
    try {
      const response = await axios.get('https://dhru-placement-portal.onrender.com/student/admin_notifications');
      setAdminNotification(response.data);
    } catch (error) {
      console.error('Error fetching notifications details:', error);
    }
  };

  useEffect(() => {
    adminnotifications();
  }, []);

  return (
    <div className='mt-8'>
      <h1 className='font-bold text-5xl text-center m-10'>Notifications</h1>

      <div className="App">
        <div style={{ textAlign: "center" }}>
          <div style={{ padding: "0 20px" }}>
            {data.length > 0 ? ( // Only render the carousel if data exists
              <Carousel
                data={data}
                time={3000}
                width="1000px"
                height="300px"
                captionStyle={captionStyle}
                radius="10px"
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "850px",
                  maxHeight: "500px",
                  margin: "40px auto",
                }}
              />
            ) : (
              <p className="text-center text-gray-500">No images to display</p> // Placeholder when no data is available
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminmessage;
