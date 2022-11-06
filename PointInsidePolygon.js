function Point(x,y) {
    this.x = x;
    this.y = y;
}

function Segment(p1,p2) {
    this.start = p1;
    this.stop = p2;
}

function Poligon(listOfPoint) {
    this.points = listOfPoint;
    this.perimeter = perimeter(listOfPoint);

}

function perimeter(listOfPoint) {
    let result = 0;
    for (let i = 0; i < listOfPoint.length; i++) {
        if (i === (listOfPoint.length -1)) {
            result += Distance(listOfPoint[0], listOfPoint[i]);
            return result;
        }
        result += Distance(listOfPoint[i+1], listOfPoint[i]);
    }
}

function Distance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y -p2.y), 2))
}

function CollinearonSegment(p, q, r)
{
    return ((q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x)) &&
        (q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)))
}

function Orientation(p, q, r)
{
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    
    if (val == 0) return null; // collinear
    
    return (val > 0) // clock or counterclock wise
}

function doIntersect(s1, s2)
{
    let p1 = s1.start, q1 = s1.stop;
    let p2 = s2.start, q2 = s2.stop;
  
    let o1 = Orientation(p1, q1, p2);
    let o2 = Orientation(p1, q1, q2);
    let o3 = Orientation(p2, q2, p1);
    let o4 = Orientation(p2, q2, q1);
    
    return ((o1 != o2) && (o3 != o4))    
}

function getSegments(listOfPoint) {
    result = []
    for (let i = 0; i < listOfPoint.length; i++) {
        if (i === (listOfPoint.length -1)) {
            result.push(new Segment(listOfPoint[0], listOfPoint[i]));
            return result
        }
        result.push(new Segment(listOfPoint[i+1], listOfPoint[i]));
    }
}

function isInside(p, poli) {
    let polo = new Point(p.x + (poli.perimeter/2), p.y);
    let line = new Segment(p,polo);
    let counter = 0;
    getSegments(poli.points).forEach(element => {
        if(doIntersect(line,element)) counter += 1;
    });
    return counter % 2 !== 0
}
