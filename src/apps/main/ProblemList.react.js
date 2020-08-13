// @flow

import * as React from "react";
import axios from 'axios';
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Page, Grid, GalleryCard } from "tabler-react";
import * as Action from "apps/store/actions/ProblemListPageAction";
import SiteWrapper from "./SiteWrapper.react"; 

function ProblemList(props) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  
  React.useEffect(() => {
    console.log("====> userEffect")
		axios
		.get('http://203.246.112.32:8000/api/v1/problem/')
		.then(response => {
      dispatch(Action.getProblems(response.data.results));
			setPosts(response.data.results);
			
    })
    .catch(error => {
      console.log(error);
    })
  },[dispatch]);

  return(
  <SiteWrapper>
    {console.log("=====> render")}
    <Page.Content>
      {/* {console.log("==>",posts)} */}
      <Grid.Row className="row-cards">
      {posts.map((problem) =>(
        <Grid.Col lg={3}>
          <GalleryCard className='p-0' >
            <a onClick = {() => {
              console.log("onclick");
              // dispatch(Action.setProblemIdAction(problem.id));
              window.localStorage.setItem('selectedProblemId', problem.id);
              console.log(window.localStorage.getItem('selectedProblemId'))
            }}>
              <GalleryCard.Image
                className='mb-0'
                src={problem.thumbnail}
                href={"problem/" + problem.id}
              />
            </a>
          </GalleryCard>        
        </Grid.Col>
      ))}
      </Grid.Row>
    </Page.Content>
  </SiteWrapper>
  
  
  )
  }
export default ProblemList;