(function(){
	"use strict";
	document.addEventListener("DOMContentLoaded", function(e) {
		var screens = document.getElementsByClassName("screen");
		var currentStep = 0;
		var answers = [];
		var result = '';

		var changeStep = function(step) {
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var stepId = "step-" + step;
			showProgress(step);
			changeBack(step);
			document.getElementById(stepId).className += " visible";
			//window.scrollTo(0, 134);
			goHeader();
			currentStep = step;
		};
		var showProgress = function(step){
			var progressEl = document.getElementById('progress');
			if(step > 0) {
				if(step > 1) {
					progressEl.children[0].style.width = ((step - 1) * 10) + '%';
				}
				progressEl.className += " visible";
			}
		};
		var changeBack = function(step) {
			document.getElementById('header-back').className = 's' + step;
		};
		var goHeader = function() {
			/* var headerH = document.getElementById('main-title-holder').clientHeight;
			window.scrollTo(0, headerH); */
			window.scrollTo(0, 0);
		};
		var calculateResult = function() {
			var resultVariant = '';
			var answersString = '';
			for(var i = 0; i < screens.length; i++) {
				screens[i].className = "screen";
			}
			var numberAnswers = {};
			for(var i = 0; i < answers.length; i++) {
				numberAnswers[answers[i]] = (numberAnswers[answers[i]] || 0) + 1;
				answersString += answers[i];
			}
			console.log(answersString);
			var answersByFrequency = [];
			for(var variant in numberAnswers) {
				answersByFrequency.push([variant, numberAnswers[variant]]);
			}
			//console.log(answersByFrequency);
			answersByFrequency.sort(function(a, b) {return b[1] - a[1]});
			//console.log(answersByFrequency);
			if(answersByFrequency[0][1] > 2 || answersByFrequency[0][1] == 2 && answersByFrequency[1][1] < 2) {
				resultVariant = answersByFrequency[0][0];
			}
			else {
				resultVariant = answersByFrequency[0][0];
			}
			result = resultVariant;
		};

		var showResult = function() {
			if(result.length > 0) {
				window.scrollTo(0, 0);
				location = 'b-test-result-' + result + '.html';
			}
		};

		var processStep = function(option) {
			answers.push(option);
			if(currentStep < 10) {
				var nextStep = currentStep + 1;
				changeStep(nextStep);
			}
			else {
				calculateResult();
				showResult();
			}
		};

		document.getElementById("start-btn").addEventListener("click", function(){
			changeStep(1);
		}, false);

		var stepOptions = document.getElementsByClassName("step-option");
		for (var i = 0; i < stepOptions.length; i++) {
			stepOptions[i].addEventListener("click", function(){
				processStep(this.getAttribute("data-option"));
			}, false);
		}

		document.getElementById("step-0").className += " visible";
	});

	window.onbeforeunload = function(){
		window.scrollTo(0,0);
	}
})(window, document);
