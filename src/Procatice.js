import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
  
  const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';
  const heyya = 'border-bottom border-gray bg-white'
  
  const Header = () => (
    <header>
      <Navbar fixed="top" color="dark" light expand="xs" className={heyya} style={{ height: 100 }}>
  
        <Container>
          <Row noGutters className="position-relative w-100 align-items-center">
  
          <Col className="d-none d-lg-flex justify-content-start">
              <Nav className="mrx-auto" navbar>
  
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                  </NavLink>
                </NavItem>
  
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">Home</NavLink>
                </NavItem>
  
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">Events</NavLink>
                </NavItem>
  
                <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                  <DropdownToggle className="font-weight-bold" nav caret>Learn</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Learn React</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Documentation</DropdownItem>
                    <DropdownItem>Tutorials</DropdownItem>
                    <DropdownItem>Courses</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
  
              </Nav>
            </Col>
  
            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
              <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                <img  alt="logo" className="position-relative img-fluid" />
              </NavbarBrand>
            </Col>
  
            <Col className="d-none d-lg-flex justify-content-end">
              <Form inline>
                <Input type="search" className="mr-3" placeholder="Search React Courses" />
                <Button type="submit" color="info" outline>Search</Button>
              </Form>
            </Col>
  
          </Row>
        </Container>
  
      </Navbar>
    </header>
  );
  
  export default Header;



  import { useState, useEffect } from "react";
  import axios from "axios";
  import { Badge } from "reactstrap";
  
  const Post = () => {
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      axios
        .get(
          "https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text"
        )
        .then((response) => setPost(response.data));
    }, []);
    return (
      <>
        {post && (
          <div className="position-relative">
            <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
              Editor's Pick
              <Badge
                pill
                color="success"
                className="text-uppercase px-2 py-1 ml-3 mb-1 align-middle"
                style={{ fontSize: "0.75rem" }}
              >
                New
              </Badge>
            </span>
  
            <span className="d-block pb-4 h2 text-dark border-bottom border-gray">
              Getting Started with React
            </span>
  
            <article
              className="pt-5 text-secondary text-justify"
              style={{ fontSize: "0.9rem", whiteSpace: "pre-line" }}
            >
              {post}
            </article>
          </div>
        )}
      </>
    );
  };
  





  import { Button, UncontrolledAlert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
const BANNER = "https://i.imgur.com/CaKdFMq.jpg";
const SideCard = () => (
  <>
    <UncontrolledAlert color="danger" className="d-none d-lg-block">
      <strong>Account not activated.</strong>
    </UncontrolledAlert>
    <Card>
      <CardImg top width="100%" src={BANNER} alt="banner" />
      <CardBody>
        <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">
          Glad Chinda
        </CardTitle>
        <CardSubtitle
          className="text-secondary mb-3 font-weight-light text-uppercase"
          style={{ fontSize: "0.8rem" }}
        >
          Web Developer, Lagos
        </CardSubtitle>
        <CardText
          className="text-secondary mb-4"
          style={{ fontSize: "0.75rem" }}
        >
          Full-stack web developer learning new hacks one day at a time. Web
          technology enthusiast. Hacking stuffs @theflutterwave.
        </CardText>
        <Button color="success" className="font-weight-bold">
          View Profile
        </Button>
      </CardBody>
    </Card>
  </>
);

  
<main className="my-5 py-5">
<Container className="px-0">
  <Row
    noGutters
    className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative"
  >
    <Col
      xs={{ order: 2 }}
      md={{ size: 4, order: 1 }}
      tag="aside"
      className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0"
    >
      <SideCard />
    </Col>

    <Col
      xs={{ order: 1 }}
      md={{ size: 7, offset: 1 }}
      tag="section"
      className="py-5 mb-5 py-md-0 mb-md-0"
    >
      <Post />
    </Col>
  </Row>
</Container>
</main>