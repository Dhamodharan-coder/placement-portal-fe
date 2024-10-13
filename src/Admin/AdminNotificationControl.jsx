import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer';
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminNotificationControl = () => {
  const [images, setImages] = useState({
    image: null,
    imagetwo: null,
    imagethree: null,
    message:""
  });

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevState) => ({
          ...prevState,
          [imageKey]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <AdminNavbar />
      <div className='m-10 text-right'>
                            <Link to="/admin-portal" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
      
      {/* Main content for image editing */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
          <h2 className="text-center text-2xl font-bold text-indigo-800">Edit Images</h2>

          <Formik
            initialValues={{ image: null, imagetwo: null, imagethree: null, message:"" }}
            onSubmit={async(values) => {
              try {
            const result = confirm("Are You Sure?");
            if(result){
              const token = localStorage.getItem('token3');
              const response = await axios.put('https://dhru-placement-portal.onrender.com/admin/admin-notifications',values, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              });
              toast.success("uploaded Successfully") 
            }
              } catch (error) {
                console.error('Error fetching interview link details:', error);
                toast.error("upload Failed") 
                throw error;
              }
             
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                {/* Image 1 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image 1</label>
                  <div className="mt-1 flex items-center justify-center border-2 border-indigo-800 border-dashed p-2 rounded-md">
                    {images.image ? (
                      <img src={images.image} alt="Uploaded" className="w-40 h-40 object-cover" />
                    ) : (
                      <span className="text-gray-400">No image uploaded</span>
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleImageChange(e, "image");
                        setFieldValue("image", e.currentTarget.files[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="ml-4 py-1 px-3 bg-indigo-800 text-white rounded-md"
                      onClick={() => document.querySelector("input[name='image']").click()}
                    >
                      {images.image ? "Edit" : "Upload"}
                    </button>
                  </div>
                </div>

                {/* Image 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image 2</label>
                  <div className="mt-1 flex items-center justify-center border-2 border-indigo-800 border-dashed p-2 rounded-md">
                    {images.imagetwo ? (
                      <img src={images.imagetwo} alt="Uploaded" className="w-40 h-40 object-cover" />
                    ) : (
                      <span className="text-gray-400">No image uploaded</span>
                    )}
                    <input
                      type="file"
                      name="imagetwo"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleImageChange(e, "imagetwo");
                        setFieldValue("imagetwo", e.currentTarget.files[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="ml-4 py-1 px-3 bg-indigo-800 text-white rounded-md"
                      onClick={() => document.querySelector("input[name='imagetwo']").click()}
                    >
                      {images.imagetwo ? "Edit" : "Upload"}
                    </button>
                  </div>
                </div>

                {/* Image 3 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image 3</label>
                  <div className="mt-1 flex items-center justify-center border-2 border-indigo-800 border-dashed p-2 rounded-md">
                    {images.imagethree ? (
                      <img src={images.imagethree} alt="Uploaded" className="w-40 h-40 object-cover" />
                    ) : (
                      <span className="text-gray-400">No image uploaded</span>
                    )}
                    <input
                      type="file"
                      name="imagethree"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        handleImageChange(e, "imagethree");
                        setFieldValue("imagethree", e.currentTarget.files[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="ml-4 py-1 px-3 bg-indigo-800 text-white rounded-md"
                      onClick={() => document.querySelector("input[name='imagethree']").click()}
                    >
                      {images.imagethree ? "Edit" : "Upload"}
                    </button>
                  </div>
                </div>

                

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-800 text-white rounded-md hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminNotificationControl;
