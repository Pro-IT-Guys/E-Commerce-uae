import React from 'react'

export default function ProductDetails({ product }) {
  const { description } = product || {}

  console.log(description);
  const convertContentToHTML = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    return tempDiv.innerHTML;
  };

  const processedDescription = convertContentToHTML();

  return (
    <div>
      <div
        className="pb-3 pt-5 text-justify imgUrl"
        dangerouslySetInnerHTML={{ __html: processedDescription  }}
      ></div>
    </div>
  )
}
