import { useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { dbService } from '../../firebase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function MyVerticallyCenteredModal( props ) {
  const [vNumber, setVNumber] = useState('');
  const [vTitle, setVTitle] = useState('');
  const [vContents, setVContents] = useState('');
  const onHide = props.onHide;

  const onChange = (e) => {
    const {
      target: { name, value },
  } = e;
  
  if (name === "Num") {
      setVNumber(value);
    } else if (name === "title") {
      setVTitle(value);
    } else if (name === "contents") {
      setVContents(value);
    }
  }
  
  const dataPost = async (e) => {
      e.preventDefault();
      try {
          await addDoc(collection(dbService, props.admin === null ? "to-do-list" : "version"), {
            versId: 1,
            versionNum: vNumber,
            versionTitle: vTitle,
            versionContents: vContents
      });
      } catch (error) {
      }
      setVNumber("");
      setVTitle("");
      setVContents("");
      onHide()
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update 추가 내용
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Version Number</Form.Label>
                <Form.Control name="Num" type="text" onChange={onChange} placeholder="version number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Version Title</Form.Label>
                <Form.Control name="title" type="text" onChange={onChange} placeholder="version Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Version Contnets</Form.Label>
                <Form.Control name="contents" as="textarea" onChange={onChange} placeholder="Version Contnets" rows={3}/>
            </Form.Group>
          </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={dataPost}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UpdateModal({ userObj }) {
    const [modalShow, setModalShow] = useState(false);

    return(
        <>
            <Button variant="outline-secondary" onClick={() => setModalShow(true)}>
                Update 추가
            </Button>

            <MyVerticallyCenteredModal
                admin = {userObj}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default UpdateModal;