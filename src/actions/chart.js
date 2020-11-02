import {processRequest} from "./server";
import {select} from "d3-selection";
import {scaleLinear,scaleLog} from "d3-scale";
import {min,max} from "d3-array";
import {format} from "d3-format";
import {axisLeft,axisBottom} from "d3-axis";
import {requestType} from "../config/http";
import {endpoint} from "../config/server";

export const d3plot = svgChart => async (dispatch,getState) => {
    const bootstrapColors = {
        //these are similar to Bootstrap, but not the same, until I find a way to get them directly from Bootstrap
        thrubiBlueChart:    "#3d5e73",
        thrubiSilverChart:  "#cccccc",
        thrubiGoldChart:    "#947a25",
    };

    const populationId = getState().client.ref.id;
    const ccyId = getState().client.ref.ccyId;
    const ccySymbol = getState().client.ref.ccySymbol;
    const ref = await dispatch(processRequest(requestType.GET,endpoint.REF_FETCH+"/"+populationId,{}));

    const xAxisLabel = "Income in "+ccyId+" "+ccySymbol;
    const yAxisLabel = "# who earn "+ccyId+" "+ccySymbol+" (or more)";
    const circleRadius = 2;

    const vRatio = 0.7;
    const widthLimit = 800;

    if (!svgChart) return 0;

    const svg = select(svgChart);
    let width = svgChart.clientWidth;
    svgChart.style.paddingLeft = 0;
    if (width>widthLimit) {
        const paddingLeft = (width-widthLimit)/2;
        svgChart.style.paddingLeft = paddingLeft>10?paddingLeft:0;
        width = widthLimit;
        svgChart.style.width = width;
    }
    const height = width*vRatio;
    svgChart.style.height = height;
    const xTicks = width>550?10:width>350?5:3;

    const margin = {top:15,right:25,bottom:45,left:65};
    const innerWidth = width-margin.left-margin.right;
    const innerHeight = height-margin.top-margin.bottom;

    svg.selectAll("*").remove();

    const xValue = d => d.m;
    const minxValue = +min(ref,xValue);
    const maxxValue = +max(ref,xValue);
    const xScale = scaleLinear()
        .domain([minxValue,maxxValue])
        .rangeRound([margin.left,margin.left+innerWidth])
        .nice();

    const yValue = d => d.n;
    const minyValue = +min(ref,yValue);
    const maxyValue = +max(ref,yValue);
    const yScale = scaleLog()
        .domain([minyValue,maxyValue])
        .rangeRound([margin.top+innerHeight,margin.top])
        .nice();

    // main viewport
    const g = svg
        .append("g")
        .attr("width",innerWidth)
        .attr("height",innerHeight);

    // x axis
    const xAxis = axisBottom(xScale)
        .tickFormat(d => format(".2s")(d).replace("G","B"))
        .tickSize(innerHeight)
        .tickPadding(10)
        .ticks(xTicks);
    // x axis labels
    const xAxisG = g
        .append("g")
        .call(xAxis)
        .attr("transform",`translate(0,${margin.top})`)
        .attr("stroke",bootstrapColors.thrubiBlueChart); // x axis numbers
    xAxisG.select(".domain")
        .remove();
    xAxisG.selectAll("line")
        .attr("stroke",bootstrapColors.thrubiSilverChart); // x axis vertical lines
    xAxisG.append("text")
        .attr("class","axis-label")
        .attr("y",innerHeight+margin.top+15)
        .attr("x",margin.left+(innerWidth/2))
        .attr("stroke",bootstrapColors.thrubiBlueChart) // x axis label
        .text(xAxisLabel);

    // y axis
    const yAxis = axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => format(".1s")(d).replace("G","B"))
        .tickSize(innerWidth)
        .tickPadding(5);
    // y axis labels
    const yAxisG = g
        .append("g")
        .call(yAxis)
        .attr("transform",`translate(${innerWidth+margin.left},0)`)
        .attr("class","tick")
        .attr("stroke",bootstrapColors.thrubiBlueChart); // y axis numbers
    yAxisG.selectAll(".domain")
        .remove();
    yAxisG.selectAll("line")
        .attr("stroke",bootstrapColors.thrubiSilverChart); // y axis horizontal lines
    yAxisG.append("text")
        .attr("class","axis-label")
        .attr("y",-(innerWidth+margin.left-15))
        .attr("x",-innerHeight/2)
        .attr("text-anchor","middle")
        .attr("transform",`rotate(-90)`)
        .attr("stroke",bootstrapColors.thrubiBlueChart) // y axis label
        .text(yAxisLabel);

    // scatter data
    g.selectAll("circle")
        .data(ref)
        .enter()
        .append("circle")
        .attr("cy",d => yScale(yValue(d)))
        .attr("cx",d => xScale(xValue(d)))
        .attr("r",circleRadius)
        .attr("fill",bootstrapColors.thrubiGoldChart)
        .attr("stroke",bootstrapColors.thrubiGoldChart)
        .on("mouseover",handleMouseOver)
        .on("mouseout",handleMouseOut); // data points: dots

    // Create Event Handlers for mouse
    function handleMouseOver(d,i) {  // Add interactivity
        // Use D3 to select element, change color and size
        select(this)
            .attr("r",circleRadius*2);

        console.error(xScale(xValue(d)),width,((xScale(xValue(d))>(width/2))?"end":"start"));

        // Specify where to put label of text
        g.append("text")
            .attr("id","t"+d.x+"-"+d.y+"-"+i)  // Create an id for text so we can select it later for removing on mouseout
            .attr("text-anchor",((xScale(xValue(d))>(width/2))?"end":"start"))
            .attr("x",() => (xScale(xValue(d))+((xScale(xValue(d))>(width/2))?margin.right:-margin.left)))
            .attr("y",() => (yScale(yValue(d))-15))
            .attr("fill",bootstrapColors.thrubiBlueChart)
            .text(() => (format(".2s")(yValue(d)).replace("G","B")+" people "+(xValue(d)>=0?"earn":"have a debt of up to")
                +" "+ccySymbol+format(".2s")(xValue(d)>=0?xValue(d):-xValue(d)).replace("G","B")+(xValue(d)>=0?"+":" or an income")));  // Value of the text
    }

    function handleMouseOut(d,i) {
        // Use D3 to select element, change color back to normal
        select(this)
            .attr("r",circleRadius);

        // Select text by id and then remove
        select("#t"+d.x+"-"+d.y+"-"+i)
            .remove();  // Remove text location
    }
};
