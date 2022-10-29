/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

export class cnrCommentsClass {
  constructor() {};

  cnrGetAllComments() { return cnrCommentsList; };
  
  cnrGetCommentsForID(cnrIdParam) {
    const cnrCommentsForIDVar = {};
    cnrCommentsForIDVar.cnrComments = [...cnrCommentsList.cnrComment].filter(cnrIDVar => cnrIDVar.cnrID === cnrIdParam).map(cnrIDVar => cnrIDVar.cnrComment);

    return cnrCommentsForIDVar;
  };

}; // cnrCommentsClass

const cnrCommentsList = [
  {
    cnrID: 'Bechler Falls',
    cnrDate: 'cnrDate Bechler Falls',
    cnrComment: 'cnrComment Bechler Falls'
  },
  {
    cnrID: 'Teton Canyon',
    cnrDate: 'cnrDate Teton Canyon',
    cnrComment: 'cnrComment Teton Canyon'
  },
  {
    cnrID: 'Denanda Falls',
    cnrDate: 'cnrDate Denanda Falls',
    cnrComment: 'cnrComment Denanda Falls'
  }  
];
