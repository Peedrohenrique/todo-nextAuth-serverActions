import React, { useState } from "react";
import Modal from "react-modal";

const ImageModal = ({ isOpen, images, onClose, onSelect }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl: any) => {
    setSelectedImage(imageUrl);
    onSelect(imageUrl);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="grid grid-cols-7 gap-4">
        {images.map((imageUrl: any) => (
          <img
            key={imageUrl}
            src={imageUrl || "/user-40x40.jpg"}
            alt="Imagem"
            className={`w-20 h-20 cursor-pointer rounded-full ${
              selectedImage === imageUrl ? "border-4 border-blue-500" : ""
            }`}
            onClick={() => handleImageClick(imageUrl)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ImageModal;
