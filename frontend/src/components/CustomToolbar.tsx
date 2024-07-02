import RecQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CustomToolbar = () => {

    return (
        <div id="toolbar">
            <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="">Normal</option>
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-link" />
            <button className="ql-image" />
        </div>
    );
};

const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await axios.post('http://localhost:8000/api/v1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        const url = response.data.url;
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };
  
export const modules = {
    toolbar: {
    container:'#toolbar',
    handlers:{
        image: imageHandler
    }
}
}

