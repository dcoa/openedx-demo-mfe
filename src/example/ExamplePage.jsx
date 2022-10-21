import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, TextFilter, DataTable, CardView, Card, Alert, useToggle, ModalLayer, Button, ModalCloseButton
} from '@edx/paragon';
import { WarningFilled } from '@edx/paragon/icons';
import { fetchCourses } from './data';

const CourseCard = ({ className, original }) => {

  const [isOpen, open, close] = useToggle(false);
  const {
    id, name, org, start, end, media, shortDescription
  } = original;
  
  console.log(original)
  return (
    <>
    <Card className={className} onClick={open}>
      <Card.ImageCap src={media.image.small} srcAlt="Course image" />
      <Card.Header
        title={name}
        subtitle={org}
      />
      <Card.Section>
        <ul>
          <li>ID: {id}</li>
          <li>Start Date: {start}</li>
          <li>End Date: {end}</li>
        </ul>
      </Card.Section>
    </Card>
    <ModalLayer isOpen={isOpen} onClose={close}>
        <div role="dialog" aria-label="My dialog" className="mw-sm p-5 bg-white mx-auto my-5">
          <h1>{name}</h1>
          <p>
            <Button variant="primary" className="mie-2">A button</Button>
            <ModalCloseButton variant="outline-primary">Close modal</ModalCloseButton>
          </p>
          <p>
            {shortDescription}
          </p>
        </div>
      </ModalLayer>
    </>
  );
};

const CoursesTable = ({ data }) => {
  const [currentView, setCurrentView] = useState('card');
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Organization',
      accessor: 'org',
    },
    {
      Header: 'Course Name',
      accessor: 'name',
    },
    {
      Header: 'Start Date',
      accessor: 'start',
    },
    {
      Header: 'End Date',
      accessor: 'end',
    },
  ];

  return (
    <DataTable
      itemCount={data.length}
      data={data}
      columns={columns}
      isSortable
      isFilterable
      defaultColumnValues={{ Filter: TextFilter }}
      dataViewToggleOptions={{
        isDataViewToggleEnabled: true,
        onDataViewToggle: val => setCurrentView(val),
        defaultActiveStateValue: 'card',
      }}
    >
      <DataTable.TableControlBar />
      { currentView === 'list' && <DataTable.Table /> }
      { currentView === 'card' && <CardView CardComponent={CourseCard} /> }
      <DataTable.EmptyTable content="No results found." />
      <DataTable.TableFooter />
    </DataTable>
  );
};

export default function ExamplePage() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Container>
      <Alert variant="warning" icon={WarningFilled}>
        <Alert.Heading>Hey, this is a new component</Alert.Heading>
        This is a new component to display a modal
      </Alert>
      <Row className="justify-content-center m-4 custom-row">
        <Col>
          <CoursesTable data={data.results} />
        </Col>
      </Row>
    </Container>
  );
}

CourseCard.propTypes = {
  className: PropTypes.string,
  original: PropTypes.objectOf(PropTypes.any),
};

CourseCard.defaultProps = {
  className: '',
  original: {},
};

CoursesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

CoursesTable.defaultProps = {
  data: [],
};