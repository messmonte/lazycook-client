// import React, { Component } from "react";
// import { getRecipesForUser } from "../store/actions/recipe";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// class EventCard extends Component {
//   async componentDidMount() {
//     // console.log(`recipe id`, this.props.recipe.id);
//     await this.props.getRecipesForUser(this.props.recipe.id);
//   }
//   render() {
//     // console.log(
//     //   `CARD USER`,
//     //   this.props.user,
//     //   this.props
//     // );
//     const now = new Date();
//     const updated = new Date(this.props.recipe.updatedAt);
//     const hours = Math.abs(now - updated) / 36e5;

//     return (
//       <div className="col-lg-4 col-md-6 col-12" key={this.props.recipe.id}>
//         <h1 className="text-center">
//           <Link to={`/recipe/${this.props.recipe.id}`}>
//             {this.props.recipe.name}
//           </Link>
//         </h1>
//         <h3 className="text-center">
//           {" "}
//           Created by:{" "}
//           <Link to={`/users/${this.props.user.id}`}>
//             {this.props.user.email}
//           </Link>
//         </h3>
//         <h3 className="text-center">
//           {" "}
//           {this.props.recipe.startDate} to {this.props.event.endDate}{" "}
//         </h3>
//         <img src={this.props.event.picture} alt="" className="mr-3" />
//         <p className="text-center"> {this.props.event.description} </p>
//         <p> Uploaded {Math.round(hours / 24)} days ago</p>
//         <div>
//           <h3 className="text-center"> Tickets Available</h3>
//           <AllTickets tickets={this.props.tickets} event={this.props.event} />
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     tickets: state.event.eventTickets
//   };
// }
// const mapDispatchToProps = { getTicketsForEvent };

// export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
