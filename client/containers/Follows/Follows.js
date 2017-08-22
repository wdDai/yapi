import React, { Component } from 'react';
import './Follows.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { getFollowList } from  '../../reducer/modules/follow';
import Subnav from '../../components/Subnav/Subnav.js';
import ProjectCard from '../../components/ProjectCard/ProjectCard.js';
import ErrMsg from '../../components/ErrMsg/ErrMsg.js';


@connect(
  state => {
    return {
      data: state.follow.data,
      uid: state.user.uid
    }
  },
  {
    getFollowList
  }
)
class Follows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  static propTypes = {
    getFollowList: PropTypes.func,
    uid: PropTypes.number
  }

  receiveRes = () => {
    console.log('receive res!');
    this.props.getFollowList(this.props.uid).then((res) => {
      console.log(res);
      if (res.payload.data.errcode === 0) {
        this.setState({
          data: res.payload.data.data.list
        })
      }
    });
  }

  async componentWillMount() {
    console.log(this.props);
    this.props.getFollowList(this.props.uid).then((res) => {
      console.log(res);
      if (res.payload.data.errcode === 0) {
        this.setState({
          data: res.payload.data.data.list
        })
      }
    });
  }

  render () {
    const data = this.state.data;
    return (
      <div>
        <Subnav
          default={'我的关注'}
          data={[{
            name: '项目广场',
            path: '/group'
          }, {
            name: '我的关注',
            path: '/follow'
          }]}/>
        <div className="g-row">
          <Row gutter={24} className="follow-box card-panel">
            {data.length ? data.map((item, index) => {
              return (
                <Col span={8} key={index}>
                  <ProjectCard projectData={item} inFollowPage={true} callbackResult={this.receiveRes} />
                </Col>);
            }): <ErrMsg type="noFollow"/>}
          </Row>
        </div>
      </div>
    )
  }
}

export default Follows;
