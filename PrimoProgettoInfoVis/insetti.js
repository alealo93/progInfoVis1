





			//Array di 10 colori
			var colori = ["#3CB371", "#4169E1", "#800000", "#778899", "#ADD8E6", "#DC143C", "#DCDCDC", "#F5DEB3", "#008080", "#9400D3"];

			//dataset path
			json_path = "insetti.json"







			//funzioni di supporto

			function getColore(d) {
				return colori[dataSet.indexOf(d)]
			}

			function puntoEllisse(d, angle) {
				x = (d.larghezza * Math.cos(angle)) + d.posizioneOrizzontale;
				y = (d.lunghezza * Math.sin(angle)) + d.posizioneVerticale + d.lunghezza;
				return [x,y]
			}




			function changeValues(index1, index2) {

				tempPO = dataSet[index1].posizioneOrizzontale;
				tempPV = dataSet[index1].posizioneVerticale;
				tempLU = dataSet[index1].lunghezza;
				tempLA = dataSet[index1].larghezza;
				tempDO = dataSet[index1].dimensioneOcchi;
				tempLG = dataSet[index1].lunghezzaGambe;

				dataSet[index1].posizioneOrizzontale = dataSet[index2].posizioneOrizzontale;
				dataSet[index1].posizioneVerticale = dataSet[index2].posizioneVerticale;
				dataSet[index1].lunghezza = dataSet[index2].lunghezza;
				dataSet[index1].larghezza = dataSet[index2].larghezza;
				dataSet[index1].dimensioneOcchi = dataSet[index2].dimensioneOcchi;
				dataSet[index1].lunghezzaGambe = dataSet[index2].lunghezzaGambe;

				dataSet[index2].posizioneOrizzontale = tempPO;
				dataSet[index2].posizioneVerticale = tempPV;
				dataSet[index2].lunghezza = tempLU;
				dataSet[index2].larghezza = tempLA;
				dataSet[index2].dimensioneOcchi = tempDO;
				dataSet[index2].lunghezzaGambe = tempLG;
			}







			//main
			var svg = d3.select("body").append("svg").attr('width', 1500).attr('height', 850);

			var dataSet;

			d3.json(json_path).then(function(data) {
				dataSet = data;
				loadDataSet();
			});








			function loadDataSet () {
				svg.selectAll("g").data(dataSet).join(

					//clausola enter
					function (enter) {
						g = enter.append("g");

						//testa
						g.append("circle")
							.attr('cx', function(d) { return d.posizioneOrizzontale})
							.attr('cy', function(d) { return d.posizioneVerticale})
							.attr('r', function(d) { return Math.min(d.larghezza/2, d.lunghezza/2)})
							.attr("stroke", "black")
							.attr("stroke-width", 2)
							.attr("class", "head")
							.attr('fill', function(d) { return getColore(d)});

						//corpo
						g.append("ellipse")
							.attr('cx', function(d) { return d.posizioneOrizzontale})
							.attr('cy', function(d) { return d.posizioneVerticale + d.lunghezza})
							.attr('rx', function(d) { return d.larghezza})
							.attr('ry', function(d) { return d.lunghezza})
							.attr("stroke-width", 2)
							.attr("stroke", "black")
							.attr("class", "body")
							.attr('fill', function(d) { return getColore(d)});

						//occhio destro
						g.append("circle")
							.attr('cx', function(d) { return d.posizioneOrizzontale + ((d.dimensioneOcchi/2)+4) + (Math.min(d.larghezza/2, d.lunghezza/2)/6) })
							.attr("cy", function(d) { return d.posizioneVerticale - Math.min(d.larghezza/4, d.lunghezza/4)})
							.attr("r", function(d) { return d.dimensioneOcchi})
							.attr("class", "eye right_eye")
							.attr("fill", "black");

						//occhio sinistro
						g.append("circle")
							.attr('cx', function(d) { return d.posizioneOrizzontale - ((d.dimensioneOcchi/2)+4) - (Math.min(d.larghezza/2, d.lunghezza/2)/6) })
							.attr("cy", function(d) { return d.posizioneVerticale - Math.min(d.larghezza/4, d.lunghezza/4) })
							.attr("r", function(d) { return d.dimensioneOcchi})
							.attr("class", "eye left_eye")
							.attr("fill", "black");

						//zampa destra avanti
						g.append("line")
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4);
								return x + (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4);
								return y - (d.lunghezzaGambe/Math.sqrt(2))})

							.attr("class", "front_right_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//zampa sinistra avanti
						g.append("line")
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4);
								return x - (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4);
								return y - (d.lunghezzaGambe/Math.sqrt(2))})

							.attr("class", "front_left_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//zampa destra in mezzo
						g.append("polyline")
							.attr("points", function(d) {
								[x, y] = [d.posizioneOrizzontale + d.larghezza, d.posizioneVerticale + d.lunghezza];
								s = (d.lunghezzaGambe * 3/4)/Math.sqrt(2);
								return [x, y, x + d.lunghezzaGambe/4, y, x + d.lunghezzaGambe/4 + s, y + s];
							})
							.attr("class", "middle_right_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//zampa sinistra in mezzo
						g.append("polyline")
							.attr("points", function(d) {
								[x, y] = [d.posizioneOrizzontale - d.larghezza, d.posizioneVerticale + d.lunghezza];
								s = (d.lunghezzaGambe * 3/4)/Math.sqrt(2);
								return [x, y, x - d.lunghezzaGambe/4, y, x - d.lunghezzaGambe/4 - s, y + s];
							})
							.attr("class", "middle_left_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//zampa destra dietro
						g.append("line")
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, Math.PI/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, Math.PI/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, Math.PI/4);
								return x + (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, Math.PI/4);
								return y + (d.lunghezzaGambe/Math.sqrt(2))})

							.attr("class", "back_right_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//zampa sinistra dietro
						g.append("line")
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4);
								return x - (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4);
								return y + (d.lunghezzaGambe/Math.sqrt(2))})

							.attr("class", "back_left_leg")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//linea verticale corpo
						g.append("line")
							.attr("x1", function(d) { return d.posizioneOrizzontale})
							.attr("y1", function(d) { return d.posizioneVerticale + d.lunghezza/2})
							.attr("x2", function(d) { return d.posizioneOrizzontale})
							.attr("y2", function(d) { return d.posizioneVerticale + 2 * d.lunghezza})
							.attr("class", "vertical_wings_line")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");


						//antenna destra
						g.append("line")



							.attr("x1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return x})
							.attr("y1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return y})
							.attr("x2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return x + s/2})
							.attr("y2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return y - s/2})


							.attr("class", "right_antenna")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

						//antenna sinistra
						g.append("line")
							.attr("x1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale - r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return x})
							.attr("y1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return y})
							.attr("x2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale - r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return x - s/2})
							.attr("y2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return y - s/2})
							.attr("class", "left_antenna")
							.attr("fill", "None")
							.attr("stroke-width", 2)
							.attr("stroke", "black");

					},



					//clausola update
					function (update) {
						tx = d3.transition().duration(3000);

						//testa
						update.select(".head")
							.transition(tx)
							.attr('cx', function(d) { return d.posizioneOrizzontale})
							.attr('cy', function(d) { return d.posizioneVerticale})
							.attr('r', function(d) { return Math.min(d.larghezza/2, d.lunghezza/2)})
							.attr("stroke", "black");

						//corpo
						update.select(".body")
							.transition(tx)
							.attr('cx', function(d) { return d.posizioneOrizzontale})
							.attr('cy', function(d) { return d.posizioneVerticale + d.lunghezza})
							.attr('rx', function(d) { return d.larghezza})
							.attr('ry', function(d) { return d.lunghezza});

						//occhio destro
						update.select(".right_eye")
							.transition(tx)
							.attr('cx', function(d) { return d.posizioneOrizzontale + ((d.dimensioneOcchi/2)+4) + (Math.min(d.larghezza/2, d.lunghezza/2)/6) })
							.attr("cy", function(d) { return d.posizioneVerticale - Math.min(d.larghezza/4, d.lunghezza/4)})
							.attr("r", function(d) { return d.dimensioneOcchi})

						//occio sinistro
						update.select(".left_eye")
							.transition(tx)
							.attr('cx', function(d) { return d.posizioneOrizzontale - ((d.dimensioneOcchi/2)+4) - (Math.min(d.larghezza/2, d.lunghezza/2)/6) })
							.attr("cy", function(d) { return d.posizioneVerticale - Math.min(d.larghezza/4, d.lunghezza/4) })
							.attr("r", function(d) { return d.dimensioneOcchi})
							.attr("class", "eye left_eye")
							.attr("fill", "black");

						//zampa destra avanti
						update.select(".front_right_leg")
							.transition(tx)
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4);
								return x + (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, -Math.PI/4);
								return y - (d.lunghezzaGambe/Math.sqrt(2))});


						//zampa sinistra avanti
						update.select(".front_left_leg")
							.transition(tx)
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4);
								return x - (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, -Math.PI* 3/4);
								return y - (d.lunghezzaGambe/Math.sqrt(2))});

						//zampa destra in mezzo
						update.select(".middle_right_leg")
							.transition(tx)
							.attr("points", function(d) {
								[x, y] = [d.posizioneOrizzontale + d.larghezza, d.posizioneVerticale + d.lunghezza];
								s = (d.lunghezzaGambe * 3/4)/Math.sqrt(2);
								return [x, y, x + d.lunghezzaGambe/4, y, x + d.lunghezzaGambe/4 + s, y + s];
							});

						//zampa sinistra in mezzo
						update.select(".middle_left_leg")
							.transition(tx)
							.attr("points", function(d) {
								[x, y] = [d.posizioneOrizzontale - d.larghezza, d.posizioneVerticale + d.lunghezza];
								s = (d.lunghezzaGambe * 3/4)/Math.sqrt(2);
								return [x, y, x - d.lunghezzaGambe/4, y, x - d.lunghezzaGambe/4 - s, y + s];
							});

						//zampa destra dietro
						update.select(".back_right_leg")
							.transition(tx)
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, Math.PI/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, Math.PI/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, Math.PI/4);
								return x + (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, Math.PI/4);
								return y + (d.lunghezzaGambe/Math.sqrt(2))});

						//zampa sinistra dietro
						update.select(".back_left_leg")
							.transition(tx)
							.attr("x1", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4); return x})
							.attr("y1", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4); return y})
							.attr("x2", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4);
								return x - (d.lunghezzaGambe/Math.sqrt(2))})
							.attr("y2", function(d) { [x, y] = puntoEllisse(d, Math.PI * 3/4);
								return y + (d.lunghezzaGambe/Math.sqrt(2))})

						//linea verticale corpo
						update.select(".vertical_wings_line")
							.transition(tx)
							.attr("x1", function(d) { return d.posizioneOrizzontale})
							.attr("y1", function(d) { return d.posizioneVerticale + d.lunghezza/2})
							.attr("x2", function(d) { return d.posizioneOrizzontale})
							.attr("y2", function(d) { return d.posizioneVerticale + 2 * d.lunghezza})


						//antenna destra
						update.select(".right_antenna")
							.transition(tx)


							.attr("x1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return x})
							.attr("y1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return y})
							.attr("x2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return x + s/2})
							.attr("y2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return y - s/2})

						//antenna sinistra
						update.select(".left_antenna")
							.transition(tx)
							.attr("x1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale - r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return x})
							.attr("y1", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2]; return y})
							.attr("x2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale - r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return x - s/2})
							.attr("y2", function(d) { r = Math.min(d.larghezza/2, d.lunghezza/2); s = Math.max(d.larghezza/2, d.lunghezza/2);
								[x, y] = [d.posizioneOrizzontale + r * Math.sqrt(2)/2, d.posizioneVerticale - r * Math.sqrt(2)/2];
								return y - s/2})

						}
					)






				svg.selectAll("g").on('mousedown', function(d) {
					rect_index = dataSet.indexOf(d);
					do {
						other_index = Math.floor(Math.random() * dataSet.length);
					}while(rect_index === other_index);
					changeValues(rect_index, other_index);
					loadDataSet();
				});
			}
